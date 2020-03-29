const Edge = require('./edge');

class Graph {
  constructor(edges) {
    this.edges = [];
    this.fillEdges(edges || []);
    this.updatePointList();
  }

  updatePointList() {
    this.pointsList = [];
    this.charLoop((char) => this.edges.forEach(edge => {
      if (edge.hasPoint(char)) {
        this.pointsList.push(char);
      }
    }));
  }

  charLoop(callback, charFrom = 'A', charTo = 'Z') {
    const charFromCode = charFrom.charCodeAt(0);
    const charToCode = charTo.charCodeAt(0);
    const isReversed = charToCode < charFromCode;
    for (let current = charFromCode;
         isReversed ? current >= charToCode : current <= charToCode;
         isReversed ? current-- : current++) {
      const char = String.fromCodePoint(current);
      if (callback(char)) return;
    }
  }

  getStartPoint() {
    let point = undefined;
    this.charLoop((char) => {
      if (this.pointsList.includes(char)) return point = char;
    });
    return point || ' ';
  }

  getEndPoint() {
    let point = undefined;
    this.charLoop((char) => {
      if (this.pointsList.includes(char)) return point = char;
    }, 'Z', 'A');
    return point || ' ';
  }

  getAdjacentEdges(point) {
    const adjacentEdges = [];
    this.edges.forEach(el => {
      if (el.hasPoint(point)) {
        adjacentEdges.push(el);
      }
    });
    return adjacentEdges;
  }

  fillEdges(edges) {
    edges.forEach(edgeArray => this.edges.push(new Edge(...edgeArray)));
  }
}

module.exports = Graph;
