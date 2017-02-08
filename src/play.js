class Play {

  constructor(playerIndex, set) {
    this.playerIndex = playerIndex;
    this.set = set;
  }

  toString() {
    return `Player ${this.playerIndex} played ${this.set.map((card) => card.toString())}`;
  }

};

module.exports = Play;
