var express = require("express");
var router = express.Router();
var	Campground 	= require("../models/campgrounds");
var	Comment 	= require("../models/comments");

//INDEX Route ---- show all campgrounds 
router.get("/campgrounds", function(req, res){
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
router.post("/campgrounds", isLoggedIn, function(req, res){
	console.log(req.body);
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
router.get("/campgrounds/new", function(req, res){
	res.render("campgrounds/new", {currentUser: req.user});
});

//SHOW Route
router.get("/campgrounds/:id", isLoggedIn, function(req, res){
	// Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
		}else{
			res.render("campgrounds/show", {campground: foundCampground, currentUser: req.user});
		}
	});
});


//create function to verify user is logged in
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}else{
		res.redirect("/login");
	}
}

module.exports = router;
