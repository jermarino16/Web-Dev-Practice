var express 	= require("express"),
	app 		= express(),
	bodyParser 	= require("body-parser"),
	mongoose 	= require("mongoose"),
	passport 	= require("passport"),
	LocalStrategy = require("passport-local"),
	Campground 	= require("./models/campgrounds.js"),
	Comment 	= require("./models/comments"),
	User 		= require("./models/users")
	seedDB = require("./seeds");

seedDB(); //remove all campgrounds from DB

//	==============================
// 	PASSPORT CONFIGURATION
// ==============================
app.use(require("express-session")({
	secret: "Jeremy cute",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//mongoose app set up
mongoose.set('useNewUrlParser', true);	//avoid deprecation
mongoose.set('useUnifiedTopology', true); //avoid deprecation
mongoose.connect("mongodb://localhost/yelp_camp");//connect / create to db

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs") // so i dont have to write ".ejs" for file
app.use(express.static(__dirname + "/public"));

//define this to pass in currentUser variable to everything
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
})

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
			res.render("campgrounds/index", {campgrounds: all_campgrounds, currentUser: req.user});
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
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
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
app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
	//find specific campground by id
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		} else{
			//if we find the campground save the data from the form
			var comment_text = req.body.comment.text;
			var comment_author = req.body.comment.author;
			//i could also just use req.body.comment
			//create a comment and associate to that campground
			Comment.create({
				text: comment_text,
				author: comment_author
				//i could also just use req.body.comment
			}, function(err, comment){
				if(err){
					console.log(err);
				} else{
					//push the comment to the campground that was found
					campground.comments.push(comment);
					campground.save();
					console.log("created a new comment");
					//redirect back to that specific campground page
					res.redirect("/campgrounds/" + campground._id);
				}
			})
		}
	})
});

// AUTH ROUTES

// show register form
app.get("/register", function(req, res){
	res.render("register");
});

//handle sign-up logic 
app.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){	//we get this from local mongoose
		if(err){
			console.log(err);
			return res.render("register");
		}
		else{
			passport.authenticate("local")(req, res, function(){
				res.redirect("/campgrounds");
			})
		}
	});
});

//show login form
app.get("/login", function(req, res){
	res.render("login");
});

//handle login logic
app.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/campgrounds",
		failureRedirect: "/login"
}), function(req, res){
});

//add logout route
app.get("/logout", function(req,res){
	req.logout();
	res.redirect("/campgrounds");
});

//create function to verify user is logged in
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}else{
		res.redirect("/login");
	}
}

app.listen(process.env.PORT || 3000, process.env.ip, function(){
	console.log("Yelp Server has started");
});