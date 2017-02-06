const helpers = require('./helpers');
const Deck = require('./deck');
const Player = require('./player');

class Game {

  constructor(ais) {
    this.setupDeck();
    this.setupPlayers(ais);
  }

  setupDeck() {
    this.deck = new Deck();
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
