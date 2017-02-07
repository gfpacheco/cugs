const helpers = require('./helpers');
const Deck = require('./deck');
const Player = require('./player');

const MIN_CARDS_PER_PLAYER = 9;

class Game {

  constructor(ais) {
    this.setupDeck(ais.length);
    this.setupPlayers(ais);
  }

  setupDeck(numOfPlayers) {
    const numOfDecks = Math.ceil((MIN_CARDS_PER_PLAYER * numOfPlayers) / Deck.size);
    this.deck = new Deck(numOfDecks);
    this.deck.shuffle();
  }

  setupPlayers(ais) {
    ais = helpers.shuffleArray(ais);

    const numPlayers = ais.length;
    const hands = ais.map(() => []);

    let i = 0;
    while (this.deck.length > 0) {
      hands[i % numPlayers].push(this.deck.pop());
      i += 1;
    }

    this.players = ais.map((ai, i) => new Player(i, hands[i], ai));
  }

  toString() {
    return this.players.map((player) => player.toString());
  }

};

module.exports = Game;
