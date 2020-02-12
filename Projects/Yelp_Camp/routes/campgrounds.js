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
	//console.log(req.body);
	//get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var newCampground = {name: name, image: image, description: desc, author: author};
	Campground.create(newCampground, function(err, newCreated){//using the object schema defined at top to access db
		if(err){
			console.log(err);
		}else{
			//console.log(newCreated);
			res.redirect("/campgrounds");//go back to campground page after create
		}
	});
});

//NEW Route - show form to create new campground
router.get("/campgrounds/new", isLoggedIn, function(req, res){
	res.render("campgrounds/new", {currentUser: req.user});
});

//SHOW Route
router.get("/campgrounds/:id", function(req, res){
	// Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
		}else{
			res.render("campgrounds/show", {campground: foundCampground, currentUser: req.user});
		}
	});
});
//Edit Campground Route
router.get("/campgrounds/:id/edit", function(req, res){
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		}else{
			res.render("campgrounds/edit", {campground: foundCampground});
		}
	});
});
//Update Campground Route
	//find and update the correct campground
	//redirect somewhere
router.put("/campgrounds/:id", checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		}else{
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

// Delete Campground route
router.delete("/campgrounds/:id", checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndDelete(req.params.id, function(err, deletedCampground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		}else{
			// console.log(deletedCampground);//we are deleting this from db
			res.redirect("/campgrounds");
		}
	});
});


function checkCampgroundOwnership(req, res, next){
	//check if user is logged in
	if(req.isAuthenticated()){
		//if they are logged in see if they made the specific campground
		//get the campground
		Campground.findById(req.params.id, function(err, foundCampground){
			//check if the users id is the campgrounds author id
			if(foundCampground.author.id.equals(req.user._id)){
				//if its the id then let them do w/e
				next();
			}else{//if its not the id then send em back
				res.redirect("back");
			}
		});
	}else{//if not logged in send the user back
		res.redirect("back");
	}
}

//create function to verify user is logged in
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}else{
		res.redirect("/login");
	}
}

module.exports = router;
