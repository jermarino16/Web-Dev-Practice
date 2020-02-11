var express 	= require("express");
var router 		= express.Router();
var passport	= require("passport");
var	User 		= require("../models/users");

//route for "/"
router.get("/", function(req, res){
	res.render("landing");
});

// AUTH ROUTES
// show register form
router.get("/register", function(req, res){
	res.render("register");
});

//handle sign-up logic 
router.post("/register", function(req, res){
	console.log(req.body.username);
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){	//we get this from local mongoose
		if(err){
			console.log(err);
			return res.render("register");
		}
		else{
			passport.authenticate("local")(req, res, function(){
				res.redirect("/campgrounds");
			});
		}
	});
});

//show login form
router.get("/login", function(req, res){
	res.render("login");
});

//handle login logic
router.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/campgrounds",
		failureRedirect: "/login"
	}), function(req, res){
});

//add logout route
router.get("/logout", function(req,res){
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

module.exports = router;