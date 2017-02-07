const helpers = require('./helpers');
const Card = require('./card');

const suits = [
  '♥',
  '♦',
  '♣',
  '♠',
];

const values = [
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'J',
  'Q',
  'K',
  'A',
  '2',
];

const size = suits.length * values.length;

class Deck {

  constructor(numOfdecks) {
    this.cards = [];

    for (let i = 0; i < numOfdecks; i++) {
      for (const suit of suits) {
        for (const value of values) {
          this.cards.push(new Card(suit, value));
        }
      }
    }
  }

  shuffle() {
    this.cards = helpers.shuffleArray(this.cards);
  }

  pop() {
    return this.cards.pop();
  }

  get length() {
    return this.cards.length;
  }

  toString() {
    return this.cards.map((card) => card.toString());
  }

};

Deck.suits = suits;
Deck.values = values;
Deck.size = size;

module.exports = Deck;
