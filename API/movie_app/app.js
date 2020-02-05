var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs"); //do this so we dont have to call files "results.ejs" and can type "results" instead

// route for "/"
app.get("/", function(req, res){
	res.send("welcome to the movies")
})

//route of /results
app.get("/results", function(req, res){
	request("http://www.omdbapi.com/?s=california&apikey=thewdb", function(error, response, body){
		if(!error && response.statusCode == 200){
			var results = JSON.parse(body);
			// res.send(results.Search[0].Title);
			console.log(results.Search[0].Title);
			res.render("results");
		}
	})
})

//launch server and have it listen
app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log("Movie has started");
});