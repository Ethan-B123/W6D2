class Snake {
  constructor(direction = "N", length = 4) {
    this.direction = direction;
    this.segments = [];
    this.length = length;
    this.lastSpot = undefined;
    this.growing = false;
    this.score = 0;
    this.updateScore = function(){};
  }

  placeSnake(pos) {
    this.segments.push(pos);
    for (let i = 1; i < this.length; i++) {
      this.segments.push([pos[0], pos[1] + i]);
    }
  }

  move() {
    if (!this.growing) {
      this.lastSpot = this.segments.pop();
    } else {
      this.growing = false;
    }
    let head = this.segments[0];
    switch (this.direction) {
      case "N":
        this.segments.unshift([head[0], head[1] - 1]);
        break;
      case "E":
        this.segments.unshift([head[0] + 1, head[1]]);
        break;
      case "S":
        this.segments.unshift([head[0], head[1] + 1]);
        break;
      case "W":
        this.segments.unshift([head[0] - 1, head[1]]);
        break;
    }
  }

  turn(newDirection) {
    this.direction = newDirection;
  }

  grow() {
    this.score += 1;
    this.updateScore(this.score);
    this.growing = true;
  }
}

module.exports = Snake;
