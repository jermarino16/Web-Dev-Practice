function square(num){
	console.log(num*num);
	// return num*num;
}

// var num = prompt("What do you want to square? ");

// console.log("The square is: " + square(num));

function factorial(num){
	while (num != 1){
		return num * factorial(num-1)
	}
	return 1
}

// var num = prompt("What do you want to factorial? ");

// console.log(factorial(num));

var array_of_nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

array_of_nums.forEach(square);