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
	response.send("WOOF");
});

// Make the express server listen to a specific port so it can see the response
app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log("Server starting on port 3000")
})