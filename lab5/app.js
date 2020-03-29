const computeIsomorphisms = require('./graphIsomorphisms');

const A = [[1, 2], [2, 3], [3, 1]];
console.log('Graph A-A is a isomorphic:', computeIsomorphisms(A, A).length === 3);

const B = [[1, 2], [2, 1], [1, 3]];
console.log('Graph A-B is a isomorphic:', computeIsomorphisms(A, B).length > 0);

const C = [[42, 666], [666, 1], [1, 42]];
console.log('Graph A-C is a isomorphic:', computeIsomorphisms(A, C).length > 0);

const A = 0, B = 1, C = 2, D = 3, E = 4, F = 5, G = 6;

const D = [
  [A, B],
  [B, C],
  [C, E],
  [E, G],
  [G, F],
  [F, D],
  [D, A]
];

const E = [
  [A, D],
  [D, F],
  [F, G],
  [G, E],
  [E, C],
  [C, B],
  [B, A]
];

console.log('Graph D-E is a isomorphic:', computeIsomorphisms(D, E).length > 0);
