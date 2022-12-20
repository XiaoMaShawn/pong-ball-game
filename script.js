import Ball from "./Ball.js";
import Paddle from "./Paddle.js";

const ball = new Ball(document.getElementById("ball"));
const playerPaddle = new Paddle(document.getElementById("player-paddle"));
const computerPaddle = new Paddle(document.getElementById("computer-paddle"));

//update loop --> function --> check every piece of the website
let lastTime;
function update(time) {
  if (lastTime != null) {
    const delta = time - lastTime;
    //update code
    ball.update(delta);
    computerPaddle.update(delta, ball.y);
  }
  lastTime = time;
  window.requestAnimationFrame(update)
};

//for player paddle, we only need to let the paddle follow the mousemove
document.addEventListener("mousemove", e => {
  playerPaddle.position = (e.y / window.innerHeight) * 100;
})

window.requestAnimationFrame(update)