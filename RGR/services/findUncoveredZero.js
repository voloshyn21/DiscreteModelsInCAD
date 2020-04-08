function findUncoveredZero(row_col, cost, rowCover, colCover) {
  row_col[0] = -1;	//Just a check value. Not a real index.
  row_col[1] = 0;
  let i = 0;
  let done = false;
  while (done === false) {
    let j = 0;
    while (j < cost[i].length) {
      if (cost[i][j] === 0 && rowCover[i] === 0 && colCover[j] === 0) {
        row_col[0] = i;
        row_col[1] = j;
        done = true;
      }
      j = j + 1;
    }
    i = i + 1;
    if (i >= cost.length) {
      done = true;
    }
  }
  return row_col;
}

module.exports = findUncoveredZero;
