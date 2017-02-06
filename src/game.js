const Deck = require('./deck');

class Game {

  constructor() {
    this.deck = new Deck();
    this.deck.shuffle();
  }

  printStatus() {
    console.log(this.deck);
  }

};

module.exports = Game;
