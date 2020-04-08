const getAssignmentSum = require('./getAssignmentSum');
const hgAlgorithmAssignments = require('./hgAlgorithmAssignments');

function hgAlgorithm(array, sumType) {
  return getAssignmentSum(array, hgAlgorithmAssignments(array, sumType));
}

module.exports = hgAlgorithm;
