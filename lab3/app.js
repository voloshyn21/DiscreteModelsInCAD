const Graph = require('./graph');
const Flow = require('./flow');
const Edge = require('./edge');
const data = require('./data');

const gr = new Graph(data);
const flows = [];

console.log('res', start(gr, flows));

const {weight: totalWeight} = flows.reduce((acc, cur) => ({weight: acc.weight + cur.weight}), {weight: 0});

console.log('totalWeight', totalWeight);

function start(graph = new Graph(), flows = []) {
  const startPoint = graph.getStartPoint();
  const endPoint = graph.getEndPoint();
  const availablePoints = graph.pointsList.concat();
  let point = startPoint;
  const flow = new Flow();
  while (point < endPoint) {
    let foundIndex = availablePoints.indexOf(point);
    if (~foundIndex) {
      availablePoints.splice(foundIndex, 1);
    }
    let maxEdge = new Edge('A', 'A', 0);
    for (const edge of graph.getAdjacentEdges(point)) {
      if (edge.weight > maxEdge.weight) {
        availablePoints.forEach(p => {
          if (edge.hasPoint(p)) {
            maxEdge = edge;
          }
        });
      }
    }
    if (maxEdge.weight === 0) {
      if (point === startPoint) {
        return flows;
      }
      const flowLastEdge = flow.get(flow.size() - 1);
      point = flowLastEdge.a === point
        ? flowLastEdge.b
        : flowLastEdge.a;
      flow.removeLast();
    } else {
      flow.add(maxEdge);
      point = point === maxEdge.a ? maxEdge.b : maxEdge.a;
    }
  }
  let {weight: minWeight} = flow.edges.reduce((acc, cur) => ({weight: Math.min(acc.weight, cur.weight)}), {weight: Number.MAX_SAFE_INTEGER});
  flow.weight = minWeight;
  flow.edges.forEach(edge => edge.weight = edge.weight - minWeight);
  flows.push(flow);
  return start(graph, flows);
}
