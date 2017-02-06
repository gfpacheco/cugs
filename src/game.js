const Deck = require('./deck');

class Game {

  constructor() {
    this.deck = new Deck();
  }

  printStatus() {
    console.log(this.deck);
  }

};

module.exports = Game;
