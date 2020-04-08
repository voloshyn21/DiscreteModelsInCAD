function convertPath(mask, path, count) {
  for (let i = 0; i <= count; i++) {
    if (mask[path[i][0]][path[i][1]] === 1) {
      mask[path[i][0]][path[i][1]] = 0;
    } else {
      mask[path[i][0]][path[i][1]] = 1;
    }
  }
}

module.exports = convertPath;
