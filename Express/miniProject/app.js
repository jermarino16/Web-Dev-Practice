var express = require("express");
var app = express();

// route for "/"
app.get("/", function(req, res){
	res.send("Hi there, welcome to my assignment");
});
// route for "/speak/:animal"
app.get("/speak/:animal", function(req, res){
	var animal = req.params.animal;
	res.send("The " + animal + " says yo");
});
// route for "/repeat/:word/:num"
app.get("/repeat/:word/:num", function(req, res){
	var wordToRepeat = req.params.word + " ";
	var num = Number(req.params.num);
	console.log(num);
	
	res.send(wordToRepeat.repeat(num));
});
// route for "*m"
app.get("*", function(req, res){
	res.send("Sorry, page not found... Why are you even here?")
});

// Make the express server listen to a specific port so it can see the response
app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log("Server starting on port 3000")
})