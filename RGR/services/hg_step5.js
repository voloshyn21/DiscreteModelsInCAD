const findStarInCol = require('./findStarInCol');
const findPrimeInRow = require('./findPrimeInRow');
const convertPath = require('./convertPath');
const clearCovers = require('./clearCovers');
const erasePrimes = require('./erasePrimes');

function hg_step5(mask, rowCover, colCover, zero_RC, path) {
  //What STEP 5 does:
  //Construct series of alternating primes and stars. Start with prime from step 4.
  //Take star in the same column. Next take prime in the same row as the star. Finish
  //at a prime with no star in its column. Unstar all stars and star the primes of the
  //series. Erasy any other primes. Reset covers. Go to step 3.
  let count = 0;							  //Counts rows of the path matrix.
  //let path = [];	//Path matrix (stores row and col).
  //int[][] path = new int[(mask[0].length + 2)][2];	//Path matrix (stores row and col).
  path[count][0] = zero_RC[0];	//Row of last prime.
  path[count][1] = zero_RC[1];	//Column of last prime.
  let done = false;
  while (done === false) {
    let r = findStarInCol(mask, path[count][1]);
    if (r >= 0) {
      count = count + 1;
      path[count][0] = r;				        	//Row of starred zero.
      path[count][1] = path[count - 1][1];	//Column of starred zero.
    } else {
      done = true;
    }
    if (done === false) {
      let c = findPrimeInRow(mask, path[count][0]);
      count = count + 1;
      path[count][0] = path[count - 1][0];	//Row of primed zero.
      path[count][1] = c;					        //Col of primed zero.
    }
  }
  convertPath(mask, path, count);
  clearCovers(rowCover, colCover);
  erasePrimes(mask);
  return 3;
}

module.exports = hg_step5;
