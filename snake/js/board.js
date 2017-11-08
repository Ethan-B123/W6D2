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
    if (this.snake.isAt(head)) {
      return true;
    }
    return false;
  }

  generateApples() {
    if (this.applesArr.length === 0) {
      const newApplePos = this.generateApplePos();
        // [Math.floor(Math.random() * this.x),
        // Math.floor(Math.random() * this.y)];
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

  emptySpots() {
    const empty = [];
    for (var i = 0; i <= this.x; i++) {
      for (var j = 0; j < this.y; j++) {
        if (!this.snake.isAt([i, j])) {
          empty.push([i, j]);
        }
      }
    }
    return empty;
  }

  generateApplePos(){
    const spots = this.emptySpots();
    const spotIdx = Math.floor(Math.random() * spots.length);
    return spots[spotIdx];
  }
}

module.exports = Board;
