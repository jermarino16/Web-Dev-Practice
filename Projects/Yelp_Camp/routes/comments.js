var express 		= require("express");
var router 			= express.Router();
var	Campground 		= require("../models/campgrounds");
var	Comment 		= require("../models/comments");

//=========================
// Comments Routes
// ========================
//New Route - show form to create comments for a specific campground
router.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
	console.log(req.body);
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
router.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
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
					//add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					//save comment
					comment.save();
					campground.comments.push(comment);
					campground.save();
					//redirect back to that specific campground page
					res.redirect("/campgrounds/" + campground._id);
				}
			})
		}
	})
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
