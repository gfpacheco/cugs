class Play {

  constructor(playerIndex, set) {
    this.playerIndex = playerIndex;
    this.set = set;
  }

  toString() {
    if (this.set.length > 0) {
      return `Player ${this.playerIndex} played ${this.set.map((card) => card.toString())}`;
    }

    return `Player ${this.playerIndex} passed`;
  }

};

module.exports = Play;
