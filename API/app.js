var request = require("request");

//request example
request("https://jsonplaceholder.typicode.com/todos/1", function(error, response, body){
		if(!error && response.statusCode == 200){
			var parsedData = JSON.parse(body);
			console.log("The title is " + parsedData["title"]);
		}
});