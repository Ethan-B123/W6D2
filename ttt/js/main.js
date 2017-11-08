const View = require('./ttt-view.js'); // require appropriate file
const Game = require('../solution/game.js');// require appropriate file

$( () => {
  // Your code here
  let $el = $('.ttt');
  let game = new Game();
  let view = new View(game, $el);
});
