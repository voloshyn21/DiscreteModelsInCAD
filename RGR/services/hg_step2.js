const clearCovers = require('./clearCovers');

function hg_step2(cost, mask, rowCover, colCover) {
  //What STEP 2 does:
  //Marks uncovered zeros as starred and covers their row and column.
  for (let i = 0; i < cost.length; i++) {
    for (let j = 0; j < cost[i].length; j++) {
      if ((cost[i][j] === 0) && (colCover[j] === 0) && (rowCover[i] === 0)) {
        mask[i][j] = 1;
        colCover[j] = 1;
        rowCover[i] = 1;
      }
    }
  }
  clearCovers(rowCover, colCover);	//Reset cover vectors.
  return 3;
}

module.exports = hg_step2;
