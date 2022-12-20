//computer paddle max speed
const SPEED = 0.02;

export default class Paddle {
  constructor(paddleElem) {
    this.paddleElem = paddleElem;
    this.reset();
  };

  get position() {
    return parseFloat(getComputedStyle(this.paddleElem).getPropertyValue("--position"));
  };

  set position(value) {
    this.paddleElem.style.setProperty("--position", value);
  }

  rect() {
    return this.paddleElem.getBoundingClientRect();
  }

  reset() {
    this.position = 50;
  }

  update(delta, ballHeight) {
    //use this code the paddle will be the exactly position where the ball is and player will never win
    // this.position = ballHeight;

    //use this one 
    this.position += SPEED * delta * (ballHeight - this.position);
  }
}