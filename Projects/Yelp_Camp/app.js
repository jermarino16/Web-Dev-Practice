var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose");

mongoose.set('useNewUrlParser', true);	//avoid deprecation
mongoose.set('useUnifiedTopology', true); //avoid deprecation
mongoose.connect("mongodb://localhost/yelp_camp");//connect / create to db

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs") // so i dont have to write ".ejs" for files

//Schema Setup
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);//create campground db

Campground.create({
	name: "Jeremys Campsite",
	image: "https://images.unsplash.com/photo-1511993807578-701168605ad3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1347&q=80"
}, function(err, campground){
	if(err){
		console.log(err);
	}else{
		console.log("Newly created campground: \n " + campground);
	}
});
	
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
			res.render("campgrounds", {campgrounds: all_campgrounds});
		}
	})
	
});
//CREATE Route - add new campground to database
app.post("/campgrounds", function(req, res){
	//get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image};
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
	res.render("new");
});

//SHOW Route
app.get("/campgrounds/:id", function(req, res){
	res.send("this will be the show page one day");
});

app.listen(process.env.PORT || 3000, process.env.ip, function(){
	console.log("Yelp Server has started");
});