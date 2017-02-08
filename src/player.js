const request = require('request-promise-native');

class Player {

  constructor(index, hand, ai) {
    this.index = index;
    this.hand = hand;
    this.ai = ai;
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

        for (const card of cards) {
          const index = this.hand.findIndex((c) => c.suit === card.suit && c.value === card.value);
          if (index !== undefined) {
            set = set.concat(this.hand.splice(index, 1));
          } else {
            return Promise.reject(`Player ${this.index} has no ${card.suit}${card.value} in hand`);
          }
        }

        return set;
      });
  }

  toString() {
    return `Jogador ${this.index}: ${this.hand.map((card) => card.toString())}`;
  }

};

module.exports = Player;
