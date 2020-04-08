function findLargest(array) {
  let largest = Number.NEGATIVE_INFINITY;
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      if (array[i][j] > largest) {
        largest = array[i][j];
      }
    }
  }
  return largest;
}

module.exports = findLargest;
