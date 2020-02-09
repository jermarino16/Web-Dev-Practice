//Mongoose setup - DB Setup
var mongoose = require("mongoose");

// Post - title,content
var postSchema = new mongoose.Schema({
	title: String,
	content: String
});
var Post = mongoose.model("Post", postSchema);

//this is what we are exproting
module.exports = Post;











