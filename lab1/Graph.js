const {vortex} = require('./Data');

module.exports = class Graph {
  constructor() {
    this.allEdges = [];
  }

  addEdge(edge) {
    this.allEdges.push(edge)
  }

  sortEdges() {
    this.allEdges.sort((a, b) => a.weight - b.weight)
  }

  makeSet(length) {
    let parent = [];
    for (let i = 0; i < length; i++) {
      parent.push(i);
    }
    return parent;
  }

  find(parent, vertex) {
    if (parent[vertex] !== vertex) {
      return this.find(parent, parent[vertex])
    }
    return vertex
  }

  union(parent, x, y) {
    let x_set_parent = this.find(parent, x);
    let y_set_parent = this.find(parent, y);
    parent[y_set_parent] = x_set_parent;
  }

  printGraph(edgeList) {
    console.log(edgeList);
  }

  solveEdge() {
    this.sortEdges();
    let parent = this.makeSet(vortex);
    let mst = [];

    let index = 0;
    while (index < vortex - 1) {
      const edge = this.allEdges.shift();
      const x_set = this.find(parent, edge.source);
      const y_set = this.find(parent, edge.destination);
      if (x_set !== y_set) {
        mst.push(edge);
        index++;
        this.union(parent, x_set, y_set)
      }
    }
    this.printGraph(mst);
  }
};
