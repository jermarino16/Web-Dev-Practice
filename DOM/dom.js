var h1 = document.querySelector("h1")
// var isPurple = false;

// // h1.addEventListener("click", function(){
// // 	if (isPurple){
// // 		document.body.style.background = "white";
// // 		isPurple = false;
// // 	}
// //     else{
// //     	document.body.style.background = "purple";
// //     	isPurple = true;
// //     }
// // });

h1.addEventListener("click", function(){
	document.body.classList.toggle("purple");

});

// h1.addEventListener("click", function(){
//     alert("ive been clicked")});