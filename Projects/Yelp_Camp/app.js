var express = require("express");
var app = express();

app.set("view engine", "ejs") // so i dont have to write ".ejs" for files

//route for "/"
app.get("/", function(req, res){
	res.render("landing");
});

//campgrounds router
app.get("/campgrounds", function(req, res){
	var campgrounds = [
		{
			name: "Salmon Creek",
			image: "https://images.unsplash.com/photo-1488790881751-9068aa742b9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80"
		},		
		{
			name: "Jeremys Campsite",
			image: "https://images.unsplash.com/photo-1511993807578-701168605ad3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1347&q=80"
		},		
		{
			name: "Yosemite",
			image: "https://images.unsplash.com/photo-1536002583490-9857862b246b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
		}
	]
	res.render("campgrounds", {campgrounds: campgrounds});
	
});

app.listen(process.env.PORT || 3000, process.env.ip, function(){
	console.log("Yelp Server has started");
});