function transpose(array) {
  let transposedArray = [];
  for (let i = 0; i < array[0].length; i++) {
    for (let j = 0; j < array.length; j++) {
      transposedArray[i][j] = array[j][i];
    }
  }
  return transposedArray;
}

module.exports = transpose;
