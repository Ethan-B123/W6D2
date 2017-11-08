class Board {
  constructor(snake, x = 20, y = 20, newAppleCb) {
    this.snake = snake;
    this.x = x;
    this.y = y;
    this.counter = 0;
    this.applesArr = [];
    this.newAppleCb = newAppleCb;
  }

  gameOver() {
    this.counter += 1;
    this.generateApples();
    this.checkEaten();
    return this.hitWall() || this.hitSelf();
  }

  hitWall() {
    let head = this.snake.segments[0];
    if (head[0] < 0 || head[0] > this.x) {
      return true;
    }
    else if (head[1] < 0 || head[1] > this.y) {
      return true;
    }
    return false;
  }

  hitSelf() {
    let head = this.snake.segments[0];
    let body = this.snake.segments;
    for (let i = 1; i < body.length; i++) {
      if (body[i][0] === head[0] && body[i][1] === head[1]) {
        return true;
      }
    }
    return false;
  }

  generateApples() {
    if (this.counter % 20 === 0) {
      const newApplePos =
        [Math.floor(Math.random() * this.x),
        Math.floor(Math.random() * this.y)];
      this.newAppleCb(newApplePos);
      this.applesArr.push(newApplePos);
    }
  }

  checkEaten() {
    let head = this.snake.segments[0];
    for (let i = 0; i < this.applesArr.length; i++) {
      if (this.applesArr[i][0] === head[0] && this.applesArr[i][1] === head[1]) {
        this.applesArr.splice(i, 1);
        this.snake.grow();
      }
    }
  }
}

module.exports = Board;
