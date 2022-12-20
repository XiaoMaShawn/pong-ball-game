import Ball from "./Ball.js";
import Paddle from "./Paddle.js";

const ball = new Ball(document.getElementById("ball"));
const playerPaddle = new Paddle(document.getElementById("player-paddle"));
const computerPaddle = new Paddle(document.getElementById("computer-paddle"));
const playerScoreElem = document.getElementById("player-score");
const computerScoreElem = document.getElementById("computer-score");

function isLose() {
  //rect from Ball class gets the position of the ball
  const rect = ball.rect();
  //check whether the ball hit the right/left side
  return rect.right >= window.innerWidth || rect.left <= 0
}

function handleLose() {
  const rect = ball.rect();
  if (rect.right >= window.innerWidth) {
    playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1;
  } else {
    computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1;
  }
  ball.reset();
  computerPaddle.reset();
}

//update loop --> function --> check every piece of the website
let lastTime;
function update(time) {
  if (lastTime != null) {
    const delta = time - lastTime;
    //update code
    ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);
    computerPaddle.update(delta, ball.y);

    if (isLose()) {
      // console.log("lose");
      handleLose();
    }
  }
  lastTime = time;
  window.requestAnimationFrame(update)
};

//for player paddle, we only need to let the paddle follow the mousemove
document.addEventListener("mousemove", e => {
  playerPaddle.position = (e.y / window.innerHeight) * 100;
})

window.requestAnimationFrame(update)