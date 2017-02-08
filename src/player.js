const request = require('request-promise-native');
const Deck = require('./deck');

class Player {

  constructor(index, hand, ai) {
    this.index = index;
    this.hand = hand;
    this.ai = ai;
    this.finished = hand.length === 0;
  }

  play(state) {
    return request({
      method: 'POST',
      uri: this.ai,
      body: state,
      json: true,
    })
      .then((cards) => {
        let set = [];
        const value = cards.length > 0 && cards[0].value;

        for (const card of cards) {
          const index = this.hand.findIndex((c) => c.suit === card.suit && c.value === card.value);

          if (index === undefined) {
            return Promise.reject(`Player ${this.index} tried to play a card not in his hand`);
          }

          if (card.value !== value) {
            return Promise.reject(`Player ${this.index} tried to play cards with different values`);
          }

          set = set.concat(this.hand.splice(index, 1));
        }

        const lastPlayedSet = state.lastPlayedSet;
        if (
          lastPlayedSet.length > 0 && set.length > 0 &&
          !Deck.isValueHigher(value, lastPlayedSet[0].value)
        ) {
          return Promise.reject(`Player ${this.index} tried to play a set that wasn't higher`);
        }

        return set;
      });
  }

  toString() {
    return `Jogador ${this.index}: ${this.hand.map((card) => card.toString())}`;
  }

};

module.exports = Player;
