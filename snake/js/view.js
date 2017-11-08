const Snake = require('./snake.js');
const Board = require('./board.js');

class View {
  constructor(board, $el) {
    this.board = board;
    this.$el = $el;
    this.snake = this.board.snake;
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
    $(`#${newPos[0]}-${newPos[1]}`).css('background-color', 'red');
    $(`#${oldPos[0]}-${oldPos[1]}`).css('background-color', 'white');
  }

  printApples() {
    $('.tile').text("");
    this.board.applesArr.forEach(function(apple) {
      $(`#${apple[0]}-${apple[1]}`).text("A");
    });
  }
}

module.exports = View;
