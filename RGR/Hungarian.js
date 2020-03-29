//Generates random 2-D array.
function generateRandomArray(array, min = 0, max = 100) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      array[i][j] = getRandomNumber(min, max)
    }
  }
}

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;

}


//Finds the largest element in a 2D array.
function findLargest(array) {
  let largest = Number.NEGATIVE_INFINITY;
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      if (array[i][j] > largest) {
        largest = array[i][j];
      }
    }
  }
  return largest;
}


//Transposes a double[][] array.
function transpose(array) {
  let transposedArray = [];
  for (let i = 0; i < array[0].length; i++) {
    for (let j = 0; j < array.length; j++) {
      transposedArray[i][j] = array[j][i];
    }
  }
  return transposedArray;
}


//Copies all elements of an array to a new array.
function copyOf(original) {
  return original.map(arr => arr.slice());
}


//Creates a copy of an array, made square by padding the right or bottom.
function copyToSquare(original, padValue) {
  let rows = original.length;
  let cols = original[0].length;	//Assume we're given a rectangular array.
  let result;

  //The matrix is already square.
  if (rows === cols) {
    result = copyOf(original);
  } else {
    //Pad on some extra columns on the right.     // rows < cols; Pad on some extra rows at the bottom.
    let dimension = rows > cols ? rows : cols;
    let adimension = rows > cols ? cols : rows;
    result = generateArray(dimension, dimension);
    for (let i = 0; i < dimension; i++) {
      for (let j = 0; j < dimension; j++) {
        //Use the padValue to fill the right columns.         //Use the padValue to fill the bottom rows.
        result[i][j] = (rows > cols ? j : i) >= adimension
          ? padValue
          : original[i][j];
      }
    }
  }
  return result;
}

function generateArray(i, j) {
  if (j) {
    return [...Array(i)].map(() => Array(j).fill(0));
  } else {
    return new Array(i).fill(0);
  }
}

//Core of the algorithm; takes required inputs and returns the assignments
function hgAlgorithmAssignments(array, sumType) {
  //This variable is used to pad a rectangular array (so it will be picked all last [cost] or first [profit])
  //and will not interfere with final assignments.  Also, it is used to flip the relationship between weights
  //when "max" defines it as a profit matrix instead of a cost matrix.  Double.MAX_VALUE is not ideal, since arithmetic
  //needs to be performed and overflow may occur.
  let maxWeightPlusOne = findLargest(array) + 1;
  let cost = copyToSquare(array, maxWeightPlusOne);	//Create the cost matrix
  //Then array is a profit array.  Must flip the values because the algorithm finds lowest.
  if (sumType.toLowerCase() === "max") {
    //Generate profit by subtracting from some value larger than everything.
    for (let i = 0; i < cost.length; i++) {
      for (let j = 0; j < cost[i].length; j++) {
        cost[i][j] = (maxWeightPlusOne - cost[i][j]);
      }
    }
  }
  let mask = generateArray(cost.length, cost[0].length);	    //The mask array.
  let rowCover = generateArray(cost.length);					        //The row covering vector.
  let colCover = generateArray(cost[0].length);		      	  	//The column covering vector.
  let zero_RC = generateArray(2);						        	  	//Position of last zero from Step 4.
  let path = generateArray(cost.length * cost[0].length + 2, 2);

  let step = 1;
  let done = false;

  while (done === false) {
    switch (step) {
      case 1:
        step = hg_step1(cost);
        break;
      case 2:
        step = hg_step2(cost, mask, rowCover, colCover);
        break;
      case 3:
        step = hg_step3(mask, colCover);
        break;
      case 4:
        step = hg_step4(cost, mask, rowCover, colCover, zero_RC);
        break;
      case 5:
        step = hg_step5(mask, rowCover, colCover, zero_RC, path);
        break;
      case 6:
        step = hg_step6(cost, rowCover, colCover);
        break;
      default:
        done = true;
        break;
    }
  }

  let assignments = generateArray(array.length, 2);	//Create the returned array.
  let assignmentCount = 0;	//In a input matrix taller than it is wide, the first
  //assignments column will have to skip some numbers, so
  //the index will not always match the first column ([0])
  for (let i = 0; i < mask.length; i++) {
    for (let j = 0; j < mask[i].length; j++) {
      if (i < array.length && j < array[0].length && mask[i][j] === 1) {
        assignments[assignmentCount][0] = i;
        assignments[assignmentCount][1] = j;
        assignmentCount++;
      }
    }
  }
  return assignments;
}


//Calls hgAlgorithmAssignments and getAssignmentSum to compute the
//minimum cost or maximum profit possible.
function hgAlgorithm(array, sumType) {
  return getAssignmentSum(array, hgAlgorithmAssignments(array, sumType));
}


function getAssignmentSum(array, assignments) {
  //Returns the min/max sum (cost/profit of the assignment) given the
  //original input matrix and an assignment array (from hgAlgorithmAssignments)
  let sum = 0;
  for (let i = 0; i < assignments.length; i++) {
    sum += array[assignments[i][0]][assignments[i][1]];
  }
  return sum;
}


function hg_step1(cost) {
  //What STEP 1 does:
  //For each row of the cost matrix, find the smallest element
  //and subtract it from from every other element in its row.
  let minValue;
  for (let i = 0; i < cost.length; i++) {
    minValue = cost[i][0];
    //1st inner loop finds min val in row.
    for (let j = 0; j < cost[i].length; j++) {
      if (minValue > cost[i][j]) {
        minValue = cost[i][j];
      }
    }
    //2nd inner loop subtracts it.
    for (let j = 0; j < cost[i].length; j++) {
      cost[i][j] = cost[i][j] - minValue;
    }
  }
  return 2;
}


function hg_step2(cost, mask, rowCover, colCover) {
  //What STEP 2 does:
  //Marks uncovered zeros as starred and covers their row and column.
  for (let i = 0; i < cost.length; i++) {
    for (let j = 0; j < cost[i].length; j++) {
      if ((cost[i][j] === 0) && (colCover[j] === 0) && (rowCover[i] === 0)) {
        mask[i][j] = 1;
        colCover[j] = 1;
        rowCover[i] = 1;
      }
    }
  }
  clearCovers(rowCover, colCover);	//Reset cover vectors.
  return 3;
}


function hg_step3(mask, colCover) {
  //What STEP 3 does:
  //Cover columns of starred zeros. Check if all columns are covered.

  //Cover columns of starred zeros.
  for (let i = 0; i < mask.length; i++) {
    for (let j = 0; j < mask[i].length; j++) {
      if (mask[i][j] === 1) {
        colCover[j] = 1;
      }
    }
  }
  let count = 0;
  //Check if all columns are covered.
  for (let j = 0; j < colCover.length; j++) {
    count = count + colCover[j];
  }
  //Should be cost.length but ok, because mask has same dimensions.
  return count >= mask.length ? 7 : 4;
}


function hg_step4(cost, mask, rowCover, colCover, zero_RC) {
  //What STEP 4 does:
  //Find an uncovered zero in cost and prime it (if none go to step 6). Check for star in same row:
  //if yes, cover the row and uncover the star's column. Repeat until no uncovered zeros are left
  //and go to step 6. If not, save location of primed zero and go to step 5.
  let step = 0;
  // int[] row_col = new int[2];	//Holds row and col of uncovered zero.
  let row_col = [];	//Holds row and col of uncovered zero.
  let done = false;
  while (done === false) {
    row_col = findUncoveredZero(row_col, cost, rowCover, colCover);
    if (row_col[0] === -1) {
      done = true;
      step = 6;
    } else {
      mask[row_col[0]][row_col[1]] = 2; //Prime the found uncovered zero.
      let starInRow = false;
      for (let j = 0; j < mask[row_col[0]].length; j++) {
        //If there is a star in the same row...
        if (mask[row_col[0]][j] === 1) {
          starInRow = true;
          row_col[1] = j;		//remember its column.
        }
      }
      if (starInRow === true) {
        rowCover[row_col[0]] = 1;	//Cover the star's row.
        colCover[row_col[1]] = 0;	//Uncover its column.
      } else {
        zero_RC[0] = row_col[0];	//Save row of primed zero.
        zero_RC[1] = row_col[1];	//Save column of primed zero.
        done = true;
        step = 5;
      }
    }
  }
  return step;
}


//Aux 1 for hg_step4.
function findUncoveredZero(row_col, cost, rowCover, colCover) {
  row_col[0] = -1;	//Just a check value. Not a real index.
  row_col[1] = 0;
  let i = 0;
  let done = false;
  while (done === false) {
    let j = 0;
    while (j < cost[i].length) {
      if (cost[i][j] === 0 && rowCover[i] === 0 && colCover[j] === 0) {
        row_col[0] = i;
        row_col[1] = j;
        done = true;
      }
      j = j + 1;
    }
    i = i + 1;
    if (i >= cost.length) {
      done = true;
    }
  }
  return row_col;
}


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


//Aux 1 for hg_step5.
function findStarInCol(mask, col) {
  //Again this is a check value.
  let r = -1;
  for (let i = 0; i < mask.length; i++) {
    if (mask[i][col] === 1) {
      r = i;
    }
  }
  return r;
}


//Aux 2 for hg_step5.
function findPrimeInRow(mask, row) {
  let c = -1;
  for (let j = 0; j < mask[row].length; j++) {
    if (mask[row][j] === 2) {
      c = j;
    }
  }
  return c;
}


//Aux 3 for hg_step5.
function convertPath(mask, path, count) {
  for (let i = 0; i <= count; i++) {
    if (mask[path[i][0]][path[i][1]] === 1) {
      mask[path[i][0]][path[i][1]] = 0;
    } else {
      mask[path[i][0]][path[i][1]] = 1;
    }
  }
}


//Aux 4 for hg_step5.
function erasePrimes(mask) {
  for (let i = 0; i < mask.length; i++) {
    for (let j = 0; j < mask[i].length; j++) {
      if (mask[i][j] === 2) {
        mask[i][j] = 0;
      }
    }
  }
}


//Aux 5 for hg_step5 (and not only).
function clearCovers(rowCover, colCover) {
  for (let i = 0; i < rowCover.length; i++) {
    rowCover[i] = 0;
  }
  for (let j = 0; j < colCover.length; j++) {
    colCover[j] = 0;
  }
}


function hg_step6(cost, rowCover, colCover) {
  //What STEP 6 does:
  //Find smallest uncovered value in cost: a. Add it to every element of covered rows
  //b. Subtract it from every element of uncovered columns. Go to step 4.
  let minValue = findSmallest(cost, rowCover, colCover);
  for (let i = 0; i < rowCover.length; i++) {
    for (let j = 0; j < colCover.length; j++) {
      if (rowCover[i] === 1) {
        cost[i][j] = cost[i][j] + minValue;
      }
      if (colCover[j] === 0) {
        cost[i][j] = cost[i][j] - minValue;
      }
    }
  }
  return 4;
}


//Aux 1 for hg_step6.
function findSmallest(cost, rowCover, colCover) {
  //There cannot be a larger cost than this.
  let minValue = Number.POSITIVE_INFINITY;
  //Now find the smallest uncovered value.
  for (let i = 0; i < cost.length; i++) {
    for (let j = 0; j < cost[i].length; j++) {
      if (rowCover[i] === 0 && colCover[j] === 0 && (minValue > cost[i][j])) {
        minValue = cost[i][j];
      }
    }
  }
  return minValue;
}

module.exports = hgAlgorithm;