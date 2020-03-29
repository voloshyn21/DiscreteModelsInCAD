class Flow {
  constructor() {
    this.edges = [];
    this.weight = 0;
  }
  get(index) {
    return this.edges[index];
  }
  size() {
    return this.edges.length;
  }
  add(edge) {
    this.edges.push(edge);
  }
  removeLast() {
    return this.edges.pop();
  }
}

module.exports = Flow;
