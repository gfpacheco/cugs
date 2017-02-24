// TODO:
// [x] Instantiate Game
// [ ] Setup players from arguments
// [ ] Step by step game
// [ ] Benchmark mode (100 games without pause)

const Game = require('./src/game');

const ais = [];
for (let i = 2; i < process.argv.length; i += 1) {
  ais.push(process.argv[i]);
}

let batchSize = 0;
if (ais[0] === '--batch') {
  batchSize = parseInt(ais[1], 10);
  ais.splice(0, 2);

  if (Number.isNaN(batchSize)) {
    console.log('--batch option needs an integer argument');
    process.exit();
  }
}

if (ais.length < 2) {
  console.log('A match needs at least 2 players to happen');
  process.exit();
}

if (batchSize === 0) {
  runSingleMatch();
} else {
  runBatch(batchSize);
}

function runSingleMatch() {
  const game = new Game(ais);
  let waitingPlayer = false;

  console.log('Game starting with these hands:');
  console.log(game.players.map((player) => player.toString()));
  console.log('Press any key to execute next move');

  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
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

              for (let i = 0; i < result.length; i += 1) {
                console.log(`${i + 1}. Player ${result[i]}`);
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
}

function runBatch(batchSize) {
  const results = [];

  const promises = [];
  for (let i = 0; i < batchSize; i += 1) {
    promises.push(runUntilTheEnd(new Game(ais))
      .then((result) => {
        results.push(result);
      }));
  }

  Promise.all(promises)
    .then(() => {
      console.log('Matches results:');
      results.forEach((result) => console.log(`[${result.join(', ')}]`));
    });
}

function runUntilTheEnd(game) {
  return game.step()
    .then(([playerFinished, gameFinished, result]) => {
      if (gameFinished) {
        return result;
      }

      return runUntilTheEnd(game);
    });
}
