var mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);	//avoid deprecation
mongoose.set('useUnifiedTopology', true); //avoid deprecation
mongoose.connect("mongodb://localhost/cat_app");

//schema for all cats
var catSchema = new mongoose.Schema({
	name: String,
	age: Number,
	temperament: String
});
//makes a collection for cat
var Cat = mongoose.model("Cat", catSchema);

// //create some cats
// var george = new Cat({
// 	name: "Mrs Norris",
// 	age: 7,
// 	temeperament: "Evil",
// });

// george.save(function(err, cat){
// 	if(err){
// 		console.log("Something went wrong");
// 	}else{
// 		console.log("We saved a cat to the db: " + cat);
// 	}
// });//adds to the database

// Cat.create({
// 	name: "snow white",
// 	age: 15,
// 	temeperament: "Bland"
// }, function(err, cat){
// 	if (err){
// 		console.log(err);
// 	}else{
// 		console.log(cat)
// 	}
// })
Cat.deleteMany({ // delete many cats
	name: "Mrs Norris",
}, function(err, cat){
	if (err){
		console.log(err);
	}else{
		console.log(cat)
	}
})

Cat.find({}, function(err, cats){
	if(err){
		console.log("error");
	}else{
		console.log("All the cats....");
		console.log(cats);
	}
})


