const GraphEdge = require('./GraphEdge');
const Graph = require('./Graph');
const GraphVertex = require('./GraphVertex');
const {eulerianPath, print} = require('./eulerianPath');

function eulerianStart() {
  const vertexA = new GraphVertex('A');
  const vertexB = new GraphVertex('B');
  const vertexC = new GraphVertex('C');
  const vertexD = new GraphVertex('D');
  const vertexE = new GraphVertex('E');
  const vertexF = new GraphVertex('F');
  const vertexG = new GraphVertex('G');

  const edgeAB = new GraphEdge(vertexA, vertexB);
  const edgeAD = new GraphEdge(vertexA, vertexD);
  const edgeBC = new GraphEdge(vertexB, vertexC);
  const edgeBD = new GraphEdge(vertexB, vertexD);
  const edgeBE = new GraphEdge(vertexB, vertexE);
  const edgeCE = new GraphEdge(vertexC, vertexE);
  const edgeDE = new GraphEdge(vertexD, vertexE);
  const edgeDF = new GraphEdge(vertexD, vertexF);
  const edgeEF = new GraphEdge(vertexE, vertexF);
  const edgeEG = new GraphEdge(vertexE, vertexG);
  const edgeFG = new GraphEdge(vertexF, vertexG);

  const graph = new Graph();

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

  print(eulerianPath(graph));
}

eulerianStart();
