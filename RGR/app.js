const hgAlgorithm = require('./services/hgAlgorithm');

const workerToJob = [
  [82, 83, 69, 92],
  [77, 37, 49, 92],
  [11, 69, 5, 86],
  [8, 9, 98, 23],
];

console.log('Початкові дані:');
console.table(workerToJob);
console.log('\nРезультат виконання роботи:');
console.log(`Оптимальним є призначення робочого 1 на роботу 3, працівника 2 на роботу 2, працівника 3 на роботу 1 та працівника 4 на роботу 4.\n` +
  `Загальний мінімальний час:`);
console.log(hgAlgorithm(workerToJob, "min"));
console.log();
console.log(`Максимальний є призначення робочого 1 на роботу 2, працівника 1 на роботу 2, працівника 3 на роботу 4 та працівника 4 на роботу 3.\n` +
  `Загальний максимальний час:`);
console.log(hgAlgorithm(workerToJob, "max"));
