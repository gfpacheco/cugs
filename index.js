// TODO:
// [x] Instantiate Game
// [ ] Setup players from arguments
// [ ] Step by step game
// [ ] Benchmark mode (100 games without pause)

const Game = require('./src/game');

const ais = [];
for (let i = 2; i < process.argv.length; i++) {
  ais.push(process.argv[i]);
}

if (ais.length < 2) {
  console.log('A match needs at least 2 players to happen');
  process.exit();
}

const game = new Game(ais);

console.log(game.players.map((player) => player.toString()));

game.step()
  .then(() => {
    console.log(game.state.previousPlays[0].toString());
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
