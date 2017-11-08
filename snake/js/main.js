const Snake = require('./snake.js');
const Board = require('./board.js');
const View = require('./view.js');


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
  s.placeSnake([5,11]);
  let v = new View(b, $('.main'));
  let lost = false;

  v.setupBoard();

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
    }
  });

  const interval = setInterval( () => {
    s.move();
    v.updateBoard();
    v.printApples();
    if (b.gameOver() && !lost) {
      clearInterval(interval);
      lost = true;
      setTimeout(()=>{alert("game over!");}, 20);

    }
  }, 150);
});
