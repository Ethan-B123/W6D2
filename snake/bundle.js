/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

class Snake {
  constructor(direction = "N", length = 4) {
    this.direction = direction;
    this.dirQueue = [];
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
    if (this.dirQueue.length > 0) {
      this.direction = this.dirQueue.pop();
    }
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
      this.dirQueue.unshift(newDirection);
      // this.direction = newDirection;
    }
  }

  checkTurn(newDirection) {
    const dirs = ["N", "E", "S", "W"];
    if (!dirs.includes(newDirection)) {
      return false;
    }
    switch (this.dirQueue[this.dirQueue.length - 1] || this.direction) {
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

  isAt(pos) {
    const body = this.segments;
    for (let i = 1; i < body.length; i++) {
      if (body[i][0] === pos[0] && body[i][1] === pos[1]) {
        return true;
      }
    }
    return false;
  }
}

module.exports = Snake;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

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


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Snake = __webpack_require__(0);
const Board = __webpack_require__(1);
const View = __webpack_require__(3);


// window.Snake = Snake;
// window.s = new Snake("N");
//
//
//
// window.Board = Board;
// window.b = new Board(window.s);
//
// window.s.placeSnake([0, 5]);
// window.s.turn("S");

$( () => {
  let s = new Snake;
  let b = new Board(s);
  s.placeSnake( [Math.floor(b.x / 2), b.y + 1] );
  let v = new View(b, $('.main'));
  let lost = false;

  v.setupBoard();


  $(".reset-button").click(() => window.location.reload());

  $(window).keypress(function(e) {
    let key = e.which;
    switch (key) {
      case 119:
      s.turn("N");
        break;
      case 100:
      s.turn("E");
        break;
      case 115:
      s.turn("S");
        break;
      case 97:
      s.turn("W");
        break;
      case 112:
      // alert("yep");
      v.pause();
        break;
    }
  });

  const interval = setInterval( () => {
    s.move();
    // v.printApples();
    v.updateBoard();
    if (b.gameOver() && !lost) {
      clearInterval(interval);
      v.showGameOver();
      lost = true;
    }
  }, 75);
});


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Snake = __webpack_require__(0);
const Board = __webpack_require__(1);

class View {
  constructor(board, $el) {
    this.board = board;
    this.$el = $el;
    this.snake = this.board.snake;
    this.board.newAppleCb = (pos) => {
      this.printApple(pos);
    };

    this.snake.updateScore = (newScore) => {
      $(".score").text(newScore);
    };
  }

  setupBoard() {
    let $ul = $('<ul class="top-box"></ul>');
    this.$el.append($ul);
    for (let i = 0; i <= this.board.x; i++) {
      let $li = $('<li></li>');
      let $row = $('<ul class="row"></ul>');
      $ul.append($li);
      $li.append($row);
      for (let j = 0; j <= this.board.y; j++) {
        let $li2 = $(`<li id="${j}-${i}" class="tile"></li>`);
        $row.append($li2);
        $li2.data('pos', [i, j]);
      }
    }
  }

  updateBoard() {
    const newPos = this.snake.segments[0];
    const oldPos = this.snake.lastSpot;
    if (this.pauseBool) {
      debugger;
    }
    $(`#${newPos[0]}-${newPos[1]}`).html('<div class="snake fill"></div>');
    $(`#${oldPos[0]}-${oldPos[1]}`).html('');
  }

  printApples() {
    this.board.applesArr.forEach(function(apple) {
      $(`#${apple[0]}-${apple[1]}`).html("<div class='apple fill'></div>");
    });
  }

  printApple(pos) {
    $(`#${pos[0]}-${pos[1]}`).html("<div class='apple fill'></div>");
  }

  pause(){
    this.pauseBool = true;
  }

  showGameOver(){
    $(".tile").addClass("game-over");
    const head = this.snake.segments[0];
    $(`#${head[0]}-${head[1]}`).html("<div class='dead-snake fill'></div>");
  }
}

module.exports = View;


/***/ })
/******/ ]);