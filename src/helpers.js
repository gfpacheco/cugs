function shuffleArray(array) {
  const original = array.concat();
  const shuffled = [];

  while (original.length > 0) {
    const randomCardIndex = Math.floor(Math.random() * original.length);
    shuffled.push(original.splice(randomCardIndex, 1)[0]);
  }

  return shuffled;
}

module.exports = {
  shuffleArray,
};
