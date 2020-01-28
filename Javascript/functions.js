// function square(num){
// 	// console.log(num*num);
// 	return num*num;
// }

// var num = prompt("What do you want to square? ");

// console.log("The square is: " + square(num));

function factorial(num){
	while (num != 1){
		return num * factorial(num-1)
	}
	return 1
}

var num = prompt("What do you want to factorial? ");

console.log(factorial(num))