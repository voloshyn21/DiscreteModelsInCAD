function findPrimeInRow(mask, row) {
  let c = -1;
  for (let j = 0; j < mask[row].length; j++) {
    if (mask[row][j] === 2) {
      c = j;
    }
  }
  return c;
}

module.exports = findPrimeInRow;

