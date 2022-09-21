class SudokuSolver {

  validate(puzzleString) {
  }

  letterToNumber(row){
    switch(row.toUpperCase()){
      case "A":
        return 1;
        case "B":
        return 2;
        case "C":
        return 3;
        case "D":
        return 4;
        case "E":
        return 5;
        case "F":
        return 6;
        case "G":
        return 7;
        case "H":
        return 8;
        case "I":
        return 9;
        default:
        return "none";
      }
  }

  checkRowPlacement(puzzleString, row, column, value) {
    let grid = this.transform_puzzle(puzzleString);
    row = this.letterToNumber(row);
    if(grid[row-1][column - 1] !==0){
      return false;
    }
    for(let i = 0; i < 9; i++){
      if(grid[row-1][i] == value){
        return true;
      }
    }
    return true;
  }

  checkColPlacement(puzzleString, row, column, value) {
    let grid = this.transform_puzzle(puzzleString);
    row = this.letterToNumber(row);
    if(grid[row - 1][column - 1] !== 0){
      return false;
    }
    for(let i = 0; i < 9; i++){
      if(grid[i][column - 1] == value){
        return false;
      }
    }
    return true;
  }

  checkRegionPlacement(puzzleString, row, col, value) {
    let grid = this.transform_puzzle(puzzleString);
    row = this.letterToNumber(row);
    if(grid[row - 1][col - 1] !==0){
      return false;
    }
    let start_row = row - (row % 3),
    start_col = col  - (col %3 );
    for(let i = 0; i< 3; i++)
      for(let k = 0; k< 3; k++)
        if(grid[i + start_col][k+ start_col] == value) return false;
    return true;
  }

  

  solve_suduko(grid, row, col){

    if(row == 9 - 1 && col == 9) return grid;

    if(col == 9 ){
      row++;
      col = 0;
    }

    if (grid[row][col] != 0) return this.solve_suduko(grid, row, col + 1);

    for( let num = 1; num < 10; num++){
      if(this.isSafe(grid,row,col,num)){
        grid[row][col] = num;
        if(this.solve_suduko(grid,row,col +1)) return grid;
      }
      grid[row][col] = 0
    }
    return false;
  }

  isSafe(grid, row, col, num){

    for(let x = 0; x <= 8; x++) if (grid[row][x] == num) return false;
  
    for(let x = 0; x <= 8; x++) if (grid[x][col] == num) return false;
  
    let start_row = row - (row %3),
    start_col = col - (col%3);
    for(let i = 0; i < 3; i++)
      for(let k = 0; k < 3; k++)
        if(grid[i + start_row][k+ start_col] == num) return false;

        return true;
  }

  transform_puzzle(puzzleString){
    let grid = [
      [0,0,0,0,0,0,0,0,0,],
      [0,0,0,0,0,0,0,0,0,],
      [0,0,0,0,0,0,0,0,0,],
      [0,0,0,0,0,0,0,0,0,],
      [0,0,0,0,0,0,0,0,0,],
      [0,0,0,0,0,0,0,0,0,],
      [0,0,0,0,0,0,0,0,0,],
      [0,0,0,0,0,0,0,0,0,],
      [0,0,0,0,0,0,0,0,0,]
    ];
    let row = -1;
    let col = 0;
    for(let i = 0; i < puzzleString.length; i++){
      if (i % 9 == 0){
        row++;
      }
      if (col % 9 == 0){
        col = 0;
      }

      grid[row][col] = puzzleString[i] === "." ? 0 : +puzzleString[i];
      col++;
    }
    return grid;
  }

  transform_back(grid){
    return grid.flat().join("");
  }


  solve(puzzleString) {
   let grid = this.transform_puzzle(puzzleString);
   let solved = this.solve_suduko(grid, 0, 0);
   if(!solved){
    return false;
   }
   let solved_string = this.transform_back(solved);
   console.log("solvedString:>>",solved_string);
   return solved_string;
  }



}

module.exports = SudokuSolver;

