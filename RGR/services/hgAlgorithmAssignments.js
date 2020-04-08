const findLargest = require('./findLargest');
const copyToSquare = require('./copyToSquare');
const generateArray = require('./generateArray');
const hg_step1 = require('./hg_step1');
const hg_step2 = require('./hg_step2');
const hg_step3 = require('./hg_step3');
const hg_step4 = require('./hg_step4');
const hg_step5 = require('./hg_step5');
const hg_step6 = require('./hg_step6');

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

module.exports = hgAlgorithmAssignments;
