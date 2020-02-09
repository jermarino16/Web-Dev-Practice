var	mongoose = require("mongoose");


//Schema Setup
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);//create campground db

module.exports = Campground;

