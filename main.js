const winCountEle = document.querySelector("#win-count");
const loseCountEle = document.querySelector("#lose-count");
const reset = document.querySelector(".scoreboard-reset");
const playBtn = document.querySelector(".play");
const playerPoints = document.querySelector("#player-points");
const computerPoints = document.querySelector("#computer-points");
const playerPaper = document.querySelector("#player-paper");
const playerRock = document.querySelector("#player-rock");
const playerScissors = document.querySelector("#player-scissors");
const computerPaper = document.querySelector("#computer-paper");
const computerRock = document.querySelector("#computer-rock");
const computerScissors = document.querySelector("#computer-scissors");
const startGame = document.querySelector(".start-game");
const playerSideImgs = document.querySelectorAll(".player-side img");
const computerSideImgs = document.querySelectorAll(".computer-side img");
const roundMessage = document.querySelector("#round-message");
const gameSide = document.querySelectorAll(".game-side-choice");
const playAgainBtns = document.querySelectorAll(".play-again");
const winMessage = document.querySelector(".win-message");
const loseMessage = document.querySelector(".lose-message");
const gameArea = document.querySelector(".game-area.main");


let winCount = localStorage.getItem("winCount") || 0;
let loseCount = localStorage.getItem("loseCount") || 0;
let playerPointCount = 0;
let computerPointCount = 0;
display();
reset.addEventListener("click", () => {
   localStorage.setItem("winCount", 0);
   localStorage.setItem("loseCount", 0);
   winCount = 0;
   loseCount = 0;
   display();
})

playBtn.addEventListener("click", () => {
   startGame.classList.remove("disable");
   playBtn.classList.add("disable");

})

playAgainBtns.forEach(btn => {
   btn.onclick = () => {
      playerPointCount = 0;
      computerPointCount = 0;
      display();
      showGameArea(gameArea);
   }
})

playerSideImgs.forEach((item) => {
   item.addEventListener("click", () => {

      item.classList.add("selected");
      const choices = ["rock", "paper", "scissors"];
      const computerChoice = choices[Math.floor(Math.random() * 3)];
      computerSideImgs.forEach(ele => {
         if (ele.dataset.name === computerChoice) {
            ele.classList.add("selected");
         }
      })
      if (item.dataset.name === computerChoice) {
         roundMessage.textContent = "= Draw =";
         roundMessage.style.color = "yellow";

      } else if ((item.dataset.name === "rock" && computerChoice === "scissors") ||
         (item.dataset.name === "paper" && computerChoice === "rock") ||
         (item.dataset.name === "scissors" && computerChoice === "paper")) {
         if (playerPointCount == 2) {
            roundMessage.textContent = "= Win ="
            roundMessage.style.color = "#2bff00";
            playerPointCount++;
            winCount++;
            display();
            localStorage.winCount = winCount;
            setTimeout(() => {
               showGameArea(winMessage);
            }, 500)

         } else {
            roundMessage.textContent = "= Win ="
            roundMessage.style.color = "#2bff00";
            playerPointCount++;
            display();
         }


      } else {
         if (computerPointCount == 2) {
            roundMessage.textContent = "= Lose ="
            roundMessage.style.color = "red";
            computerPointCount++;
            loseCount++;
            display();
            localStorage.loseCount = loseCount;
            setTimeout(() => {
               showGameArea(loseMessage);
            }, 500)

         } else {
            roundMessage.textContent = "= Lose ="
            roundMessage.style.color = "red";
            computerPointCount++;
            display();
         }
      }
      setTimeout(() => {
         gameSide.forEach(item => {
            item.classList.remove("selected");
            roundMessage.textContent = "";
         });
      }, 1000)
   })

})



function display() {
   winCountEle.innerText = `${winCount}`;
   loseCountEle.innerText = `${loseCount}`;
   playerPoints.innerText = `${playerPointCount}`;
   computerPoints.innerText = `${computerPointCount}`;
}

function showGameArea(areaName) {
   const gameAreas = document.querySelectorAll(".game-area");
   gameAreas.forEach(item => {
      item.classList.add("disable");
   })
   areaName.classList.remove("disable");
}


