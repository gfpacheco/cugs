class Player {

  constructor(index, hand, ai) {
    this.index = index;
    this.hand = hand;
    this.ai = ai;
  }

  toString() {
    return `Jogador ${this.index}: ${this.hand.map((card) => card.toString())}`;
  }

};

module.exports = Player;
