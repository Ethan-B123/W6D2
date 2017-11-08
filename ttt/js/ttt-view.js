const MoveError = require("../solution/moveError.js");

class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
    this.bindEvents();
  }

  bindEvents() {
    let that = this;
    $('.tile').each(function(idx, el) {
      let $el = $(el);
      $el.on('click', event => {
        that.makeMove($el);
      });
    });
  }

  makeMove($square) {
    try {
      let currentPlayer = this.game.currentPlayer;
      this.game.playMove($square.data('pos'));
      $square.text(currentPlayer);
      $square.css('background-color', 'pink');
    } catch (e) {
      if (e instanceof MoveError) {
        alert(e.msg);
      } else {
        throw e;
      }
    }
    if (this.game.isOver()) {
      if (this.game.winner() === null) {
        setTimeout(() => alert("You both suck!"), 20);
      }
      else {
        setTimeout(() => alert(this.game.winner() + " won!"), 20);
      }
    }
  }

  setupBoard() {
    let $ul = $('<ul class="top-box"></ul>');
    this.$el.append($ul);
    for (let i = 0; i < 3; i++) {
      let $li = $('<li></li>');
      let $row = $('<ul class="row"></ul>');
      $ul.append($li);
      $li.append($row);
      for (let j = 0; j < 3; j++) {
        let $li2 = $('<li class="tile"></li>');
        $row.append($li2);
        $li2.data('pos', [i, j]);
      }
    }
  }
}

module.exports = View;
