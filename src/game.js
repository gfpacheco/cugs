const helpers = require('./helpers');
const Deck = require('./deck');
const Player = require('./player');
const Play = require('./play');

const MIN_CARDS_PER_PLAYER = 9;

class Game {

  constructor(ais) {
    this.setupInitialState(ais.length);
    this.setupPlayers(ais);
  }

  setupInitialState(numPlayers) {
    this.state = {
      starterIndex: 0,
      currentIndex: 0,
      lastPlayedSet: [],
      playersHands: [],
      numOfDecks: Math.ceil((MIN_CARDS_PER_PLAYER * numPlayers) / Deck.size),
      previousPlays: [],
      scoreboard: [],
      finished: false,
    };
  }

  setupPlayers(ais) {
    ais = helpers.shuffleArray(ais);

    const numPlayers = ais.length;
    const hands = ais.map(() => []);
    const cards = Deck.getShuffledCards(this.state.numOfDecks);

    let i = 0;
    while (cards.length > 0) {
      hands[i % numPlayers].push(cards.pop());
      i += 1;
    }

    this.players = ais.map((ai, i) => new Player(i, hands[i], ai));
    this.state.playersHands = hands.map((hand) => hand.length);
  }

  step() {
    if (this.state.finished) {
      return Promise.reject('The game already finished');
    }

    let player = this.players[this.state.currentIndex];
    while (player.finished) {
      this.setNextPlayer();
      player = this.players[this.state.currentIndex];
    }

    return player.play(Object.assign({hand: player.hand}, this.state))
      .then((set) => {
        this.state.playersHands = this.players.map((p) => p.hand.length);
        this.state.previousPlays.push(new Play(this.state.currentIndex, set));

        if (set.length > 0) {
          this.state.lastPlayedSet = set;
          this.state.nextStarterIndex = this.state.currentIndex;

          if (player.hand.length === 0) {
            player.finished = true;
            this.state.scoreboard.push(player.ai);

            if (this.state.scoreboard.length === this.players.length) {
              this.state.finished = true;
            }
          }
        }

        this.setNextPlayer();

        return Promise.resolve([player.finished, this.state.finished, this.state.scoreboard]);
      })
      .catch((err) => {
        return Promise.reject(`Invalid play: ${err}`);
      });
  }

  setNextPlayer() {
    this.state.currentIndex = (this.state.currentIndex + 1) % this.players.length;
    if (this.state.currentIndex === this.state.starterIndex) {
      this.state.starterIndex = this.state.nextStarterIndex;
      this.state.currentIndex = this.state.nextStarterIndex;
      this.state.lastPlayedSet = [];
    }
  }

};

module.exports = Game;
