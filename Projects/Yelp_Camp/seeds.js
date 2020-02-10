var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comments");

var data = [
	{
		name: "Cool cat Camp",
		image: "https://images.unsplash.com/photo-1541716937436-7a2bcc09aaf5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		description: "blah blah blah"
	},
	{
		name: "Down dog dirt",
		image: "https://images.unsplash.com/photo-1565234141124-fc0d882e5592?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		description: "blah blah blah"
	},
	{
		name: "Mountains Motion",
		image: "https://images.unsplash.com/photo-1535646058247-2de46e113965?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		description: "blah blah blah"
	},
]

//remove campgrounds from DB and then add campgrounds
function seedDB(){
	//remove campgrounds
	Campground.deleteMany({}, function(err, campground){
		if (err){
			console.log(err);
		}else{
			console.log("removed campgrounds");
		}
	});	
	//add a few campgrounds
	data.forEach(function(seed){
		Campground.create(seed, function(err, campground){
			if (err){
				console.log(err);
			}else{
				console.log("added a campground");
				//create a comment for the campgrounds
				Comment.create(
					{
						text: "This place is great but there is no internet",
						author: "Homer"
					}, function(err, comment){
						if(err){
							console.log(err);
						}else{
							campground.comments.push(comment);
							campground.save();
							console.log("created a new comment");
						}
					})
			}
		});	
	});	
}

module.exports = seedDB;







