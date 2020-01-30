var p1Text = document.getElementById("p1-score");
var p1Button = document.getElementById("p1");
var p1Score = 0;

var p2Text = document.getElementById("p2-score");
var p2Button = document.getElementById("p2");
var p2Score = 0;

var winningScore = document.querySelector("#score-limit");
var gameOver = false;
var numInput = document.querySelector("input");

var resetButton = document.getElementById("reset");


p1Button.addEventListener("click", function(){
    if (!gameOver){
        p1Score++;
        if (p1Score == winningScore.textContent){
            p1Text.classList.add("winner");
            gameOver = true;
        }
        p1Text.textContent = p1Score;
    }
});

p2Button.addEventListener("click", function(){
    if (!gameOver){
    p2Score++;
    p2Text.textContent = p2Score;
        if (p2Score == winningScore.textContent){
            p2Text.classList.add("winner");
            gameOver = true;
        }
    }
});

resetButton.addEventListener("click", function(){
    p1Score = 0;
    p2Score = 0;
    p1Text.textContent = p1Score;
    p2Text.textContent = p2Score;
    gameOver = false;  
    p1Text.classList.remove("winner");
    p2Text.classList.remove("winner");

});
// p2Button.addEventListener("click", updateScore(p2Score + 1, "player2"));

numInput.addEventListener("change", function(){
    winningScore.textContent = numInput.value;
});