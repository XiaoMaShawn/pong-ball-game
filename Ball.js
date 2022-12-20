const INITIAL_VELOCITY = .025;
const VELOCITY_INCREASE = .00001;

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isCollision(rect1, rect2) {
  return (rect1.left <= rect2.right && rect1.right >= rect2.left && rect1.top <= rect2.bottom && rect1.bottom >= rect2.top);
}

export default class Ball {
  constructor(ballElem) {
    this.ballElem = ballElem;
    this.reset();
  }

  //get the x,y value from style.css and parse it into a JS number that we can use; set the x,y to the value we give
  get x() {
    return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--x"));
  }

  set x(value) {
    this.ballElem.style.setProperty("--x", value);
  }

  get y() {
    return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--y"));
  }

  set y(value) {
    this.ballElem.style.setProperty("--y", value);
  }

  //get the position of the ball
  rect() {
    return this.ballElem.getBoundingClientRect();
  }

  reset() {
    this.x = 50;
    this.y = 50;
    this.direction = { x: 0 };
    while (Math.abs(this.direction.x) <= .2 || Math.abs(this.direction.x) >= .9) {
      const heading = randomNumberBetween(0, 2 * Math.PI);
      this.direction = { x: Math.cos(heading), y: Math.sin(heading) }
    }
    console.log(this.direction);
    this.velocity = INITIAL_VELOCITY;
  }

  update(delta, paddleRects) {
    //let the ball moving
    this.x += this.direction.x * this.velocity * delta;
    this.y += this.direction.y * this.velocity * delta;

    //let the velocity of the ball increase
    this.velocity += VELOCITY_INCREASE * delta;

    //let the ball bounce back when hit the top/bottom of the screen
    const rect = this.rect();
    if (rect.bottom >= window.innerHeight || rect.top <= 0) {
      this.direction.y *= -1;
    }
    // let the ball bounce back when hit the paddle
    if (paddleRects.some(r => isCollision(r, rect))) {
      this.direction.x *= -1;
    }
  }
}