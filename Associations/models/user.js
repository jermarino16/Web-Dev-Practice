//Mongoose setup - DB Setup
var mongoose = require("mongoose");


// User - email, name
var userSchema = new mongoose.Schema({
	email: String,
	name: String,
	posts: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Post"
	}]
});
var User = mongoose.model("User", userSchema);

// this is what we are exporting
module.exports = User;