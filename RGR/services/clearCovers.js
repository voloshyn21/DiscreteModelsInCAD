function clearCovers(rowCover, colCover) {
  for (let i = 0; i < rowCover.length; i++) {
    rowCover[i] = 0;
  }
  for (let j = 0; j < colCover.length; j++) {
    colCover[j] = 0;
  }
}

module.exports = clearCovers;
