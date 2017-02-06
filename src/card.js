class Card {

  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
  }

  toString() {
    return `${this.suit}${this.value}`;
  }

};

module.exports = Card;
