const findUncoveredZero = require('./findUncoveredZero');

function hg_step4(cost, mask, rowCover, colCover, zero_RC) {
  //What STEP 4 does:
  //Find an uncovered zero in cost and prime it (if none go to step 6). Check for star in same row:
  //if yes, cover the row and uncover the star's column. Repeat until no uncovered zeros are left
  //and go to step 6. If not, save location of primed zero and go to step 5.
  let step = 0;
  // int[] row_col = new int[2];	//Holds row and col of uncovered zero.
  let row_col = [];	//Holds row and col of uncovered zero.
  let done = false;
  while (done === false) {
    row_col = findUncoveredZero(row_col, cost, rowCover, colCover);
    if (row_col[0] === -1) {
      done = true;
      step = 6;
    } else {
      mask[row_col[0]][row_col[1]] = 2; //Prime the found uncovered zero.
      let starInRow = false;
      for (let j = 0; j < mask[row_col[0]].length; j++) {
        //If there is a star in the same row...
        if (mask[row_col[0]][j] === 1) {
          starInRow = true;
          row_col[1] = j;		//remember its column.
        }
      }
      if (starInRow === true) {
        rowCover[row_col[0]] = 1;	//Cover the star's row.
        colCover[row_col[1]] = 0;	//Uncover its column.
      } else {
        zero_RC[0] = row_col[0];	//Save row of primed zero.
        zero_RC[1] = row_col[1];	//Save column of primed zero.
        done = true;
        step = 5;
      }
    }
  }
  return step;
}

module.exports = hg_step4;
