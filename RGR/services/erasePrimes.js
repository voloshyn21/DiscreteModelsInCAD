function erasePrimes(mask) {
  for (let i = 0; i < mask.length; i++) {
    for (let j = 0; j < mask[i].length; j++) {
      if (mask[i][j] === 2) {
        mask[i][j] = 0;
      }
    }
  }
}

module.exports = erasePrimes;
