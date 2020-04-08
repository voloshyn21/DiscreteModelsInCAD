const findSmallest = require('./findSmallest');

function hg_step6(cost, rowCover, colCover) {
  //What STEP 6 does:
  //Find smallest uncovered value in cost: a. Add it to every element of covered rows
  //b. Subtract it from every element of uncovered columns. Go to step 4.
  let minValue = findSmallest(cost, rowCover, colCover);
  for (let i = 0; i < rowCover.length; i++) {
    for (let j = 0; j < colCover.length; j++) {
      if (rowCover[i] === 1) {
        cost[i][j] = cost[i][j] + minValue;
      }
      if (colCover[j] === 0) {
        cost[i][j] = cost[i][j] - minValue;
      }
    }
  }
  return 4;
}

module.exports = hg_step6;
