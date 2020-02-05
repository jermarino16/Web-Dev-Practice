var express = require("express");
var app = express();

// route for "/" 
app.get("/", function(request, response){
	response.send("Hi There");
});

// route for "/bye"
app.get("/bye", function(request, response){
	response.send("Goodbye");
});
// route for "/dog"
app.get("/dog", function(request, response){
	console.log("Someone requested /dog");
	response.send("WOOF");
});

// route for a subreddit where ":anything" is a param and is anything -- so /r/test would work
app.get("/r/:subreddit", function(request,response){
	// console.log(request.params)
	var subredditName = request.params.subreddit;
	response.send("Welcome to the " + subredditName + " page" );
	
})

// route for a subreddit comments
app.get("/r/:subreddit/comments/:id/:title", function(request,response){
	console.log(request.params)
	response.send("Hey you found a subreddit!");
})


//route for "*"
app.get("*", function(request, response){
	response.send("You are a *");
});

// Make the express server listen to a specific port so it can see the response
app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log("Server starting on port 3000")
})