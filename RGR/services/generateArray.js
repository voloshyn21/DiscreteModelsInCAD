function generateArray(i, j) {
  if (j) {
    return [...Array(i)].map(() => Array(j).fill(0));
  } else {
    return new Array(i).fill(0);
  }
}

module.exports = generateArray;
