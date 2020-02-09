//Mongoose setup - DB Setup
var mongoose = require("mongoose");

mongoose.set('useNewUrlParser', true);	//avoid deprecation
mongoose.set('useUnifiedTopology', true); //avoid deprecation
mongoose.connect("mongodb://localhost/blog_demo");

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
	posts: [postSchema]
});

var newPost = new Post({
	title: "Reflections of Toilets",
	content: " Definitely underrated"
});

var User = mongoose.model("User", userSchema);


// // create a user
// var newUser = new User({
// 	email: "herminone@hogwarts.edu",
// 	name: "herminone granger",
// });
// newUser.posts.push({
// 	title: "How to cast spells",
// 	content: "Say wingardia labadada"
// });
// //save the user to DB
// newUser.save(function(err, user){
// 	if (err){
// 		console.log(err);
// 	} else{
// 		console.log(user);
// 	}
// });

//save the post to DB
// newPost.save(function(err, post){
// 	if (err){
// 		console.log(err);
// 	} else{
// 		console.log(post);
// 	}
// });

//Find a user in the Db with specific criteria
User.findOne({name: "herminone granger"}, function(err, user){
	if(err){
		console.log(err);
	}else{//if found add a post
		user.posts.push({
			title: "Stuff I hate",
			content: "Voldemort, Harry"
		});
		user.save(function(err, user){//save after adding the post to make a new DB entry
			if (err){
				console.log(err);
			} else{
				console.log(user);
			}
		});
	}
}); 




