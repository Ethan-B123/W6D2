class Snake {
  constructor(direction = "N", length = 4) {
    this.direction = direction;
    this.segments = [];
    this.length = length;
    this.lastSpot = undefined;
    this.growAmount = 5;
    this.growFrames = 0;
    // this.growing = false;
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
    if (this.growFrames <= 0) {
      this.lastSpot = this.segments.pop();
    } else {
      this.growFrames--;
      // this.growing = false;
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
    if (this.checkTurn(newDirection)) {
      this.direction = newDirection;
    }
  }

  checkTurn(newDirection) {
    const dirs = ["N", "E", "S", "W"];
    if (!dirs.includes(newDirection)) {
      return false;
    }
    switch (this.direction) {
      case "N":
        if (newDirection === "S") {
          return false;
        }
        break;
      case "E":
        if (newDirection === "W") {
          return false;
        }
        break;
      case "S":
        if (newDirection === "N") {
          return false;
        }
        break;
      case "W":
        if (newDirection === "E") {
          return false;
        }
        break;
    }
    return true;
  }

  grow() {
    this.score += 1;
    this.updateScore(this.score);
    // this.growing = true;
    this.growFrames = this.growAmount;
  }
}

module.exports = Snake;
