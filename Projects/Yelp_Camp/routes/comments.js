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
//Edit comment route
router.get("/campgrounds/:id/comments/:comment_id/edit", verifyCommentOwnership, function(req, res){
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err){
			console.log(err);
		}else{
			var campground_id = req.params.id;
			res.render("comments/edit", {campground_id: campground_id, comment: foundComment});	
		}
	});
});
//Update Comment Route
router.put("/campgrounds/:id/comments/:comment_id", verifyCommentOwnership, function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, foundComment){
		if(err){
			console.log(err);
		}else{
			//if found redirect back to specific campground with the comment
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});
// Delete Campground route
router.delete("/campgrounds/:id/comments/:comment_id", verifyCommentOwnership, function(req, res){
	Comment.findByIdAndDelete(req.params.comment_id, function(err, deletedComment){
		if(err){
			console.log(err);
			res.redirect("/campgrounds/" + req.params.id);
		}else{
			// console.log(deletedComment);//we are deleting this from db
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

//create function to verify user has right to edit comment
function verifyCommentOwnership(req,res,next){
	//check if user is loggedin at all
	if(req.isAuthenticated()){
		//get comment and check for correct user id
		Comment.findById(req.params.comment_id, function(err, foundComment){
			//check if the comment matches the id of user
			if(foundComment.author.id.equals(req.user._id)){//req.user is stored thanks to passport module
				//we can go to next if its correct owner
				next();
			}else{
				//otherwise send them back
				res.redirect("back");
			}
		})
	}else{
		//send user back
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
