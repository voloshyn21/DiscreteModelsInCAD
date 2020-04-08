function findSmallest(cost, rowCover, colCover) {
  //There cannot be a larger cost than this.
  let minValue = Number.POSITIVE_INFINITY;
  //Now find the smallest uncovered value.
  for (let i = 0; i < cost.length; i++) {
    for (let j = 0; j < cost[i].length; j++) {
      if (rowCover[i] === 0 && colCover[j] === 0 && (minValue > cost[i][j])) {
        minValue = cost[i][j];
      }
    }
  }
  return minValue;
}

module.exports = findSmallest;
