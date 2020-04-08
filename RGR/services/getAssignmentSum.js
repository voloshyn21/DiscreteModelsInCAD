function getAssignmentSum(array, assignments) {
  //Returns the min/max sum (cost/profit of the assignment) given the
  //original input matrix and an assignment array (from hgAlgorithmAssignments)
  let sum = 0;
  let dataValue = [];
  console.log(assignments);
  for (let i = 0; i < assignments.length; i++) {
    sum += array[assignments[i][0]][assignments[i][1]];
    dataValue.push(array[assignments[i][0]][assignments[i][1]]);
  }
  console.log(`${dataValue.join(' + ')} = ${sum}`);
  return sum;
}

module.exports = getAssignmentSum;
