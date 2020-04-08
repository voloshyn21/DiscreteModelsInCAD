const getRandomNumber = require('./getRandomNumber');

function generateRandomArray(array, min = 0, max = 100) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      array[i][j] = getRandomNumber(min, max)
    }
  }
}

module.exports = generateRandomArray;
