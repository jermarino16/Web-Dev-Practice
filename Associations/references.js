//Mongoose setup - DB Setup
var mongoose = require("mongoose");

mongoose.set('useNewUrlParser', true);	//avoid deprecation
mongoose.set('useUnifiedTopology', true); //avoid deprecation
mongoose.connect("mongodb://localhost/blog_demo_2");

// Post - title,content
var postSchema = new mongoose.Schema({
	title: String,
	content: String
});
var Post = mongoose.model("Post", postSchema);

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

// User.create({ //create a user
// 	email: "Bob@bob.com",
// 	name: "Bobby Bob"
// });

// Post.create({
// 	title: "How to cofasfasfasf",
// 	content: "asdgasfasfasfasagasdd"
// }, function(err, post){
// 	if(err){
// 		console.log(err);
// 	}else{
// 		User.findOne({email: "Bob@bob.com"}, function(err, foundUser){// find a user
// 			if(err){
// 				console.log(err);
// 			}else{
// 				foundUser.posts.push(post); //push post to the user
// 				foundUser.save(function(err, data){
// 					if (err){
// 						console.log(err);
// 					}else {
// 						console.log(data);
// 					}
// 				});
// 			}
// 		});
// 	}
// });

//retrieve the user and print out the posts by populating, exec starts running the function and we print out that user
User.findOne({email: "Bob@bob.com"}).populate("posts").exec(function(err, user){
	if(err){
		console.log(err);
	}else{
		console.log(user);
	}
});

// //example of having post data ambiguous as ids
// User.findOne({email: "Bob@bob.com"} ,function(err, user){
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log(user);
// 	}
// });














