function findStarInCol(mask, col) {
  //Again this is a check value.
  let r = -1;
  for (let i = 0; i < mask.length; i++) {
    if (mask[i][col] === 1) {
      r = i;
    }
  }
  return r;
}

module.exports = findStarInCol;
