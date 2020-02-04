var fakeGenerator = require('faker');

console.log("======================")
console.log("Welcome to my shop!")
console.log("======================")
var items = []
var prices = []

for (var i = 0; i < 10; i++){
	items.push(fakeGenerator.commerce.productName())
	prices.push(fakeGenerator.commerce.price())
}
for (var i = 0; i < 10; i++){
	console.log(items[i] + " - $" + prices[i])
}
