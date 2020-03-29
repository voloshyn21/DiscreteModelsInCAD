const ds = require('datascript');
const R = require('ramda');

const empty = ds.empty_db();

function mkDB(edges) {
  const content = edges.map(function (edge, idx) {
    const [s, t] = edge;
    return {':db/id': idx + 1, s: -s, t: -t}
  });
  return ds.db_with(empty, content)
}

function mkQuery(edges) {
  const nstr = R.pipe(
    R.flatten(),
    R.uniq(),
    R.map(n => `?n${n}`),
    R.join(' ')
  )(edges);
  const estr = R.pipe(
    R.mapObjIndexed((edge, i) => `?e${i + 1}`),
    R.values(),
    R.join(' ')
  )(edges);
  const topostr = R.pipe(
    R.mapObjIndexed(function (edge, idx) {
      const [s, t] = edge;
      const i = idx + 1;
      return `[?e${i} "s" ?n${s}] [?e${i} "t" ?n${t}] `
    }),
    R.values(),
    R.join(' ')
  )(edges);
  return `[:find ${nstr} ${estr} :in $ :where ${topostr}]`
}

const isPermutation = (assignment) => R.equals(R.length(R.uniq(assignment)), R.length(assignment));


module.exports = function (edges_graph1, edges_graph2) {
  const db = mkDB(edges_graph1);
  const q = mkQuery(edges_graph2);
  return R.filter(isPermutation, ds.q(q, db))
};
