const helpers = require('./helpers');
const Card = require('./card');

const suits = [
  'hearts',
  'diamonds',
  'clubs',
  'spades',
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

class Deck {

  constructor() {
    this.cards = [];

    for (const suit of suits) {
      for (const value of values) {
        this.cards.push(new Card(suit, value));
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

};

Deck.suits = suits;
Deck.values = values;

module.exports = Deck;
