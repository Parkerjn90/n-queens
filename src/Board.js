// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function () {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function () {
      return _(_.range(this.get('n'))).map(function (rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function (rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function (rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function (rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function () {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function (rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function () {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function (rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
             _             _     _
         ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
        / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
        \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
        |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

     */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function (rowIndex) {
      var rows = this.rows();
      var currentRow = rows[rowIndex];
      var pieceCounter = 0;
      for (var piece of currentRow) {
        if (piece === 1) {
          pieceCounter++;
        }
      }
      if (pieceCounter > 1) {
        return true;
      }
      return false; // fixme
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function () {
      //new rows variable set to this.rows()
      var rows = this.rows();
      //iterate over each row in rows
      for (let i = 0; i < rows.length; i++) {
        //invoke hasRowConflictAt on each row
        if (this.hasRowConflictAt(i)) {
          //if hasRowConflictAt
          //return true
          return true;
        }
      }

      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function (colIndex) { // base function
      // get rows
      var rows = this.rows();
      // for EACH row check at current colIndex
      var pieceCounter = 0;
      for (var row of rows) {
        // if conflict (=== 1)
        if (row[colIndex] === 1) {
          // return true
          pieceCounter++;
        }
      }
      if (pieceCounter > 1) {
        return true;
      }
      return false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function () { // board function
      // get rows
      var rows = this.rows();
      // get rows.length
      var size = rows.length;
      for (let i = 0; i < size; i++) {
        // iterate over rows first,
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function (majorDiagonalColumnIndexAtFirstRow, startRow) {
      var startRow = startRow || 0;
      var rows = this.rows();
      var pieces = 0;
      var index = majorDiagonalColumnIndexAtFirstRow;
      for (let row = startRow; row < rows.length; row++) {
        if (rows[row][index] === 1) {
          pieces++;
        }
        index++;
      }
      if (pieces > 1) {
        return true;
      }
      return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function () {
      // get rows variable
      var rows = this.rows();
      // size variable for the length of the rows
      var size = rows.length - 1;
      // iterate over each row except last one
      for (let row = 0; row < size; row++) {
        //if (on first row)
        if (row === 0) {
          //if hasMajorConflict on each index except last index returns true
          for (let col = 0; col < size; col++) {
            if (this.hasMajorDiagonalConflictAt(col)) {
              return true;
            }
          }
        } else {
          if (this.hasMajorDiagonalConflictAt(0, row)) {
            return true;
            //return true
          }
        }
      }

      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function (minorDiagonalColumnIndexAtFirstRow, startRow) {
      var startRow = startRow || 0;
      var rows = this.rows();
      var pieces = 0;
      var index = minorDiagonalColumnIndexAtFirstRow;
      for (let row = startRow; row < rows.length; row++) {
        if (rows[row][index] === 1) {
          pieces++;
        }
        if (index >= 0) {
          index--;
        }
      }
      if (pieces > 1) {
        return true;
      }
      return false;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function () {

      var rows = this.rows();
      var size = rows.length - 1;

      for (let row = 0; row < size; row++) {
        if (row === 0) {
          for (let col = size; col > 0; col--) {
            if (this.hasMinorDiagonalConflictAt(col)) {
              return true;
            }
          }
        } else {
          if (this.hasMinorDiagonalConflictAt(size, row)) {
            return true;
          }
        }
      }
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function (n) {
    return _(_.range(n)).map(function () {
      return _(_.range(n)).map(function () {
        return 0;
      });
    });
  };

}());
