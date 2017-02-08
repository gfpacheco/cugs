const helpers = require('./helpers');
const Deck = require('./deck');
const Player = require('./player');

const MIN_CARDS_PER_PLAYER = 9;

class Game {

  constructor(ais) {
    this.setupInitialState(ais.length);
    this.setupPlayers(ais);
  }

  setupInitialState(numPlayers) {
    this.state = {
      starterIndex: 0,
      lastPlayedSet: [],
      playersHands: [],
      numOfDecks: Math.ceil((MIN_CARDS_PER_PLAYER * numPlayers) / Deck.size),
      previousPlays: [],
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
  }

  toString() {
    return this.players.map((player) => player.toString());
  }

};

module.exports = Game;
