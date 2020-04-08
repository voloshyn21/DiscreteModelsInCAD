function copyOf(original) {
  return original.map(arr => arr.slice());
}

module.exports = copyOf;
