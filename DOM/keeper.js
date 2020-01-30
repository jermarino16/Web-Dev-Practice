var p1Text = document.getElementById("p1-score");
var p1Button = document.getElementById("p1");
var p1Score = 0;

var p2Text = document.getElementById("p2-score");
var p2Button = document.getElementById("p2");
var p2Score = 0;

p1Button.addEventListener("click", function(){
    p1Score++;
    p1Text.textContent = p1Score;
});
// p2Button.addEventListener("click", updateScore(p2Score + 1, "player2"));

