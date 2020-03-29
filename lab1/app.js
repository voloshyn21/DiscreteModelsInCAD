const {grapy} = require('./Data');
const Edge = require('./Edge');
const Graph = require('./Graph');

const graph = new Graph();
grapy.forEach(value => graph.addEdge(new Edge(value[0], value[1], value[2])));
graph.solveEdge();
