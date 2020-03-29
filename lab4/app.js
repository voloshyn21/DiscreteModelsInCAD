const GraphVertex = require('./GraphVertex');
const GraphEdge = require('./GraphEdge');
const Graph = require('./Graph');
const bfTravellingSalesman = require('./bfTravellingSalesman');


function tsStart() {
  const vertexA = new GraphVertex('A');
  const vertexB = new GraphVertex('B');
  const vertexC = new GraphVertex('C');
  const vertexD = new GraphVertex('D');
  const vertexE = new GraphVertex('E');
  const vertexF = new GraphVertex('F');
  const vertexG = new GraphVertex('G');

  const edgeAB = new GraphEdge(vertexA, vertexB, 7);
  const edgeAD = new GraphEdge(vertexA, vertexD, 5);
  const edgeBC = new GraphEdge(vertexB, vertexC, 8);
  const edgeBD = new GraphEdge(vertexB, vertexD, 9);
  const edgeBE = new GraphEdge(vertexB, vertexE, 7);
  const edgeCE = new GraphEdge(vertexC, vertexE, 5);
  const edgeDE = new GraphEdge(vertexD, vertexE, 15);
  const edgeDF = new GraphEdge(vertexD, vertexF, 6);
  const edgeEF = new GraphEdge(vertexE, vertexF, 8);
  const edgeEG = new GraphEdge(vertexE, vertexG, 9);
  const edgeFG = new GraphEdge(vertexF, vertexG, 11);

  const graph = new Graph(false);

  graph
    .addEdge(edgeAB)
    .addEdge(edgeAD)
    .addEdge(edgeBC)
    .addEdge(edgeBD)
    .addEdge(edgeBE)
    .addEdge(edgeCE)
    .addEdge(edgeDE)
    .addEdge(edgeDF)
    .addEdge(edgeEF)
    .addEdge(edgeEG)
    .addEdge(edgeFG);

  setItems(graph);

  let graphVertices = bfTravellingSalesman(graph);
  let weight = findTotalWeight([...graphVertices]);
  print(graphVertices, weight);
}

function setItems(graph) {
  Object.keys(graph.vertices).forEach(key => {
    Object.keys(graph.vertices).forEach(otherKey => {
      if (key !== otherKey) {
        const vertex = graph.vertices[key];
        const otherVertex = graph.vertices[otherKey];
        if (!findCommonEdge(vertex, otherVertex)) {
          graph.addEdge(new GraphEdge(vertex, otherVertex, Number.MAX_SAFE_INTEGER));
        }
      }
    })
  })
}

function findTotalWeight(graphVertices) {
  let totalWeight = 0;
  let firstVertex = graphVertices[0];
  let lastVertex = graphVertices[graphVertices.length - 1];
  let currentVertex = graphVertices.pop();
  while (currentVertex) {
    let nextVertex = graphVertices.pop();
    if (!nextVertex) {
      totalWeight += findCommonEdge(firstVertex, lastVertex).weight;
      return totalWeight;
    }
    let commonEdge = findCommonEdge(currentVertex, nextVertex);
    if (commonEdge) {
      currentVertex = nextVertex;
      totalWeight += commonEdge.weight;
    }
  }
}

function findCommonEdge(vertex, otherVertex) {
  let edge = vertex.edges.head;
  while (edge) {
    if (edge.value.startVertex.value === otherVertex.value || edge.value.endVertex.value === otherVertex.value) {
      return edge.value;
    }
    edge = edge.next;
  }
}

function print(graphVertices, weight) {
  console.log(graphVertices.toString().replace(/,/g, ' -> '));
  console.log(`Weight is: ${weight}`);

}

tsStart();
