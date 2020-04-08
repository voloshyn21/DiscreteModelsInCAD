const copyOf = require('./copyOf');
const generateArray = require('./generateArray');

function copyToSquare(original, padValue) {
  let rows = original.length;
  let cols = original[0].length;	//Assume we're given a rectangular array.
  let result;

  //The matrix is already square.
  if (rows === cols) {
    result = copyOf(original);
  } else {
    //Pad on some extra columns on the right.     // rows < cols; Pad on some extra rows at the bottom.
    let dimension = rows > cols ? rows : cols;
    let adimension = rows > cols ? cols : rows;
    result = generateArray(dimension, dimension);
    for (let i = 0; i < dimension; i++) {
      for (let j = 0; j < dimension; j++) {
        //Use the padValue to fill the right columns.         //Use the padValue to fill the bottom rows.
        result[i][j] = (rows > cols ? j : i) >= adimension
          ? padValue
          : original[i][j];
      }
    }
  }
  return result;
}

module.exports = copyToSquare;
