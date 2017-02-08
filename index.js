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
let waitingPlayer = false;

console.log('Game starting with these hands:');
console.log(game.players.map((player) => player.toString()));
console.log('Press any key to execute next move');

process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.setEncoding( 'utf8' );
process.stdin.on('data', (key) => {
  if (key === '\u0003') {
    console.log('Game stopped');
    process.exit();
  }

  if (!waitingPlayer) {
    waitingPlayer = true;
    game.step()
      .then(([playerFinished, gameFinished, result]) => {
        const lastPlay = game.state.previousPlays[game.state.previousPlays.length - 1];
        console.log(lastPlay.toString());

        if (playerFinished) {
          console.log(`Player ${lastPlay.playerIndex} finished`);

          if (gameFinished) {
            console.log('Game finished');
            console.log(`Scoreboard:`);

            for (let i = 0; i < result.length; i++) {
              console.log(`${i + 1}. Player ${result[i]} (${ais[i]})`);
            }

            process.exit();
          }
        }

        waitingPlayer = false;
      })
      .catch((err) => {
        console.error(err);
        process.exit(1);
      });
  }
});
