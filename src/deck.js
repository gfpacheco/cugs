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

const Deck = {
  suits: suits,
  values: values,
  size: size,
  getShuffledCards: getShuffledCards,
};

module.exports = Deck;

function getShuffledCards(numOfdecks) {
  const cards = [];

  for (let i = 0; i < numOfdecks; i++) {
    for (const suit of suits) {
      for (const value of values) {
        cards.push(new Card(suit, value));
      }
    }
  }

  return helpers.shuffleArray(cards);
}
