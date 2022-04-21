/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other





window.findNRooksSolution = function (n) {
  // create a new board
  var newBoard = new Board({ n: n });
  var solution = undefined;
  // create piece tracker
  var pieces = 1;
  // row var
  var row = 0;
  // column var
  var column = 0;

  var rows = newBoard.rows();
  // toggle [row, column] piece
  newBoard.togglePiece(row, column);

  // storage array to keep track of row, column indexes already toggled
  // add toggled piece to array
  var beenToggled = [[row, column]];

  // create a new function parameters:(row, column)
  var nextPiece = function (row, column) {
    //toggle new piece [#, #] that isn't in the storage array already
    newBoard.togglePiece(row, column);
    // increment pieces
    rows = newBoard.rows();
    pieces++;
    // add that row and column to our stored list
    beenToggled.push([row, column]);
    // if pieces matches n
    if (pieces === n) {
      solution = rows;
      return;
    }
    // if row + 1 or column + 1 = undefined
    if (rows[row + 1] === undefined || rows[row][column + 1] === undefined) {
      // return
      return;
    }
    nextPiece(row + 1, column + 1);
  };
  if (n > 1) {
    nextPiece(1, 1);
  } else {
    solution = [[1]];
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function (n) {
  var solutionCount = 0; //fixme
  if (n === 1) {
    solutionCount = 1;
    return solutionCount;
  }


  var updateBoard = function (row, col) {
    clearBoard.togglePiece(row, col);
    piecesOn++;

    rowsLeft.splice(rowsLeft.indexOf(row), 1);
    colsLeft.splice(colsLeft.indexOf(col), 1);
    if (piecesOn === n) {
      //add cordinates array to solution cordinates
      solutionCount++;
      return;
    }
    if (!rowsLeft.length || !colsLeft.length) {
      return;
    }
    _.each(rowsLeft, function(remainingRow) {
      _.each(colsLeft, function(remainingCols) {
        updateBoard(remainingRow, remainingCols);
      });
    });
  };
  var solutionCoordinates = [];

  for (var y = 0; y < n; y++) {
    for (var x = 0; x < n; x++) {
      //if y, x cordinates were part of previous solution
        //continue
      var clearBoard = new Board ({n: n});
      var piecesOn = 0;
      var rowsLeft = _.range(n);
      var colsLeft = _.range(n);
      // invoke function on (y, x)
      updateBoard(y, x);
    }
  }

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function (n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function (n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
