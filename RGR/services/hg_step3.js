function hg_step3(mask, colCover) {
  //What STEP 3 does:
  //Cover columns of starred zeros. Check if all columns are covered.

  //Cover columns of starred zeros.
  for (let i = 0; i < mask.length; i++) {
    for (let j = 0; j < mask[i].length; j++) {
      if (mask[i][j] === 1) {
        colCover[j] = 1;
      }
    }
  }
  let count = 0;
  //Check if all columns are covered.
  for (let j = 0; j < colCover.length; j++) {
    count = count + colCover[j];
  }
  //Should be cost.length but ok, because mask has same dimensions.
  return count >= mask.length ? 7 : 4;
}

module.exports = hg_step3;
