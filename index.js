// TODO:
// [x] Instantiate Game
// [ ] Setup players from arguments
// [ ] Step by step game
// [ ] Benchmark mode (100 games without pause)

const Game = require('./src/game');

const game = new Game([
  null,
  null,
  null,
  null,
]);

console.log(game.toString());
