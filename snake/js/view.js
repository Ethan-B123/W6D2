const Snake = require('./snake.js');
const Board = require('./board.js');

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
    $(`#${newPos[0]}-${newPos[1]}`).css('background-color', 'red');
    $(`#${newPos[0]}-${newPos[1]}`).html("");
    $(`#${oldPos[0]}-${oldPos[1]}`).css('background-color', 'white');
  }

  printApples() {
    this.board.applesArr.forEach(function(apple) {
      $(`#${apple[0]}-${apple[1]}`).html("<div class='apple'></div>");
    });
  }

  printApple(pos) {
    $(`#${pos[0]}-${pos[1]}`).html("<div class='apple'></div>");
  }

  pause(){
    this.pauseBool = true;
  }
}

module.exports = View;
