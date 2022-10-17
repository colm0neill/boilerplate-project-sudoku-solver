const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');

const solutions = require('../controllers/puzzle-strings').puzzlesAndSolutions;

let solver = new Solver();

let completeSolution = solutions[0];

suite('Unit Tests', () => {
    // Logic handles a valid puzzle string of 81 characters

    test('1. Logic handles valid puzzle string of 81 chars ', function(){
        //console.log(completeSolution[0]);
        assert.equal(solver.solve(completeSolution[0]),completeSolution[1]);
       
    });

    // Logic handles a puzzle string with invalid characters (not 1-9 or .)

    test('2. Logic handles puzzle string with invalid chars ', function(){
        let nums = '1.5..g.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
        assert.equal(solver.solve(nums),false);
       
    });

    // Logic handles a puzzle string that is not 81 characters in length

    test('3. Logic handles string that is not 81 chars ', function(){
        let nums = '1.5...84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
        assert.equal(solver.solve(nums),false);
       
    });

    // Logic handles a valid row placement

    test('4. Logic handles handles valid row placement ', function(){
        assert.equal(solver.checkRowPlacement(completeSolution[0], 'A', 2, 9),true)
    });

    // Logic handles an invalid row placement

    test('5. Logic handles invalid row placement ', function(){
        assert.equal(solver.checkRowPlacement(completeSolution[0], 'A', 2, 8),false)
    });

    // Logic handles a valid column placement

    test('6. Logic handles a valid column placement ', function(){
        assert.equal(solver.checkColPlacement(completeSolution[0], "A", 2 , 8),true)
    });

    // Logic handles an invalid column placement

    test('7. Logic handles invalid column placement ', function(){
        assert.equal(solver.checkColPlacement(completeSolution[0], "A", 2 , 9),false)
    });

    // Logic handles a valid region (3x3 grid) placement

    test('8. Logic handles valid region 3x3 grid ', function(){
        assert.equal(solver.checkRegionPlacement(completeSolution[0], "A", 2 , 3),true)
    });

    // Logic handles an invalid region (3x3 grid) placement

    test('9. Logic handles invalid region 3x3 grid', function(){
        assert.equal(solver.checkRegionPlacement(completeSolution[0], "A", 1 , 2),false)
    });

    // Valid puzzle strings pass the solver

    test('10. Valid puzzle string passes the solver ', function(){
        let nums ='1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
        
        assert.equal(solver.solve(nums),completeSolution[1]);
    });

    // Invalid puzzle strings fail the solver

    test('11. Invalid puzzle string passes the solver ', function(){
        let nums ='5.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
        
        assert.equal(solver.solve(nums),false);
    });

    // Solver returns the expected solution for an incomplete puzzle

    test('12. Solver returns for an incomplete puzzle ', function(){
        let nums ='..5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
        
        assert.equal(solver.solve(nums),completeSolution[1]);
    });

});
    