var express 	= require("express"),
	app 		= express(),
	bodyParser 	= require("body-parser"),
	mongoose 	= require("mongoose"),
	Campground 	= require("./models/campgrounds.js"),
	Comment = require("./models/comments"),
	seedDB = require("./seeds");

seedDB(); //remove all campgrounds from DB

//mongoose app set up
mongoose.set('useNewUrlParser', true);	//avoid deprecation
mongoose.set('useUnifiedTopology', true); //avoid deprecation
mongoose.connect("mongodb://localhost/yelp_camp");//connect / create to db

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs") // so i dont have to write ".ejs" for file

// Campground.create({
// 	name: "Jeremys Campsite",
// 	image: "https://images.unsplash.com/photo-1511993807578-701168605ad3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1347&q=80",
// 	description: "Jeremy goes here once a year"
// }, function(err, campground){
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log("Newly created campground: \n " + campground);
// 	}
// });
	
//route for "/"
app.get("/", function(req, res){
	res.render("landing");
});

//INDEX Route ---- show all campgrounds 
app.get("/campgrounds", function(req, res){
	//get all campgrounds from DB
	Campground.find({}, function(err, all_campgrounds){
		if(err){
			console.log("error occured");
		}else{
			res.render("campgrounds/index", {campgrounds: all_campgrounds});
		}
	}) 
	
});
//CREATE Route - add new campground to database
app.post("/campgrounds", function(req, res){
	//get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampground = {name: name, image: image, description: desc};
	Campground.create(newCampground, function(err, newCreated){//using the object schema defined at top to access db
		if(err){
			console.log(err);
		}else{
			res.redirect("/campgrounds");//go back to campground page after create
		}
	});
});

//NEW Route - show form to create new campground
app.get("/campgrounds/new", function(req, res){
	res.render("campgrounds/new");
});

//SHOW Route
app.get("/campgrounds/:id", function(req, res){
	// Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
		}else{
			console.log(foundCampground);
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
});

//=========================
// Comments Routes
// ========================
//New Route - show form to create comments for a specific campground
app.get("/campgrounds/:id/comments/new", function(req, res){
	//find campground by id
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		} else{
			res.render("comments/new", {campground: campground}); //show form to submit a comment for this campground
		}
	});
});

//CREATE Route - add new comments to specific campgrounds
app.post("/campgrounds/:id/comments", function(req, res){
	//find specific campground by id
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		} else{
			//if we find the campground save the data from the form
			var comment_text = req.body.comment.text;
			var comment_author = req.body.comment.author;
			//create a comment and associate to that campground
			Comment.create({
				text: comment_text,
				author: comment_author
			}, function(err, comment){
				if(err){
					console.log(err);
				} else{
					//push the comment to the campground that was found
					campground.comments.push(comment);
					campground.save();
					console.log("created a new comment");
					//redirect back to that specific campground page
					var campground_id = campground._id;
					res.redirect("/campgrounds/" + campground_id);
				}
			})
		}
	})
});





app.listen(process.env.PORT || 3000, process.env.ip, function(){
	console.log("Yelp Server has started");
});