function hg_step1(cost) {
  //What STEP 1 does:
  //For each row of the cost matrix, find the smallest element
  //and subtract it from from every other element in its row.
  let minValue;
  for (let i = 0; i < cost.length; i++) {
    minValue = cost[i][0];
    //1st inner loop finds min val in row.
    for (let j = 0; j < cost[i].length; j++) {
      if (minValue > cost[i][j]) {
        minValue = cost[i][j];
      }
    }
    //2nd inner loop subtracts it.
    for (let j = 0; j < cost[i].length; j++) {
      cost[i][j] = cost[i][j] - minValue;
    }
  }
  return 2;
}

module.exports = hg_step1;
