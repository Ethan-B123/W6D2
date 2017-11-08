const View = require('./js/view.js');
const Game = require('./js/game.js');

$( () => {
  const rootEl = $('.main');
  const game = new Game();
  new View(game, rootEl);
});
