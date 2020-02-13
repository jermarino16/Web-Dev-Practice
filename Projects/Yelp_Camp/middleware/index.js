//all middleware goes here

var middlewareObj = {};

//create function to verify user is logged in
middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}else{
		res.redirect("/login");
	}
}

middlewareObj.checkCampgroundOwnership = function(req, res, next){
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

//create function to verify user has right to edit comment
middlewareObj.verifyCommentOwnership = function(req,res,next){
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

module.exports = middlewareObj;