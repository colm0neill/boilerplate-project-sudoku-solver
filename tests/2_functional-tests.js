const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
// Solve a puzzle with valid puzzle string: POST request to /api/solve

  test('1. Solve a puzzle with valid puzzle string: POST request to /api/solve.', function (done) {
        chai
          .request(server)
          .post('/api/solve')
          .send({"puzzle":"..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."})
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.type, "application/json");
            assert.equal(res.body.solution, 769235418851496372432178956174569283395842761628713549283657194516924837947381625);
            done();
          });
      });
  
// // Solve a puzzle with missing puzzle string: POST request to /api/solve

  test('2. Solve a puzzle with missing puzzle string: POST request to /api/solve.', function (done) {
              chai
          .request(server)
          .post('/api/solve')
          .send({"puzzle":""})
          .end(function (err, res) {
            //console.log("Res",res.text, res.body);
            assert.equal(res.status, 200);
            assert.equal(res.type, "application/json");
            assert.equal(res.body.error, "Required field missing" );
            done();
          });
      });
  
// Solve a puzzle with invalid characters: POST request to /api/solve

  test('3. Solve a puzzle with invalid characters: POST request to /api/solve.', function (done) {
    chai
    .request(server)
    .post('/api/solve')
    .send({"puzzle":"..9..5.1.85.4!@#.2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."})
    .end(function (err, res) {
      //console.log("Res",res.text, res.body);
      assert.equal(res.status, 200);
      assert.equal(res.type, "application/json");
      assert.equal(res.body.error, "Invalid characters in puzzle" );
      done();
          });
      });
  
// Solve a puzzle with incorrect length: POST request to /api/solve

  test('4. Solve a puzzle with invalid characters: POST request to /api/solve.', function (done) {
    chai
    .request(server)
    .post('/api/solve')
    .send({"puzzle":"..9..5.1.85.42432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."})
    .end(function (err, res) {
      //console.log("Res",res.text, res.body);
      assert.equal(res.status, 200);
      assert.equal(res.type, "application/json");
      assert.equal(res.body.error, "Expected puzzle to be 81 characters long" );
      done();
          });
      });
  
// Solve a puzzle that cannot be solved: POST request to /api/solve

  test('5. Solve a puzzle that cannot be solved: POST request to /api/solve.', function (done) {
    chai
    .request(server)
    .post('/api/solve')
    .send({"puzzle":".89..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."})
    .end(function (err, res) {
      console.log("Res",res.text, res.body.error);
      assert.equal(res.status, 200);
      assert.equal(res.type, "application/json");
      assert.equal(res.body.error, "Puzzle cannot be solved" );
      done();
          });
      });
  
// Check a puzzle placement with all fields: POST request to /api/check

  test('6. Check a puzzle placement with all fields: POST request to /api/check.', function (done) {
    chai
    .request(server)
    .post('/api/check')
    .send({
        coordinate:"a1",
        puzzle: "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
        value: "7"
    })
    .end(function (err, res) {
      //console.log("Res",res.text, res.body.error);
      assert.equal(res.status, 200);
      assert.equal(res.type, "application/json");
      assert.equal(res.body.valid, true );
      done();
          });
      });
  
// Check a puzzle placement with single placement conflict: POST request to /api/check

  test('7. Check a puzzle placement with single placement conflict: POST request to /api/check', function (done) {
    chai
    .request(server)
    .post('/api/check')
    .send({
        coordinate:"a1",
        puzzle: "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
        value: "6"
    })
    .end(function (err, res) {
      //console.log("Res",res.text, res.body.conflict);
      assert.equal(res.status, 200);
      assert.equal(res.type, "application/json");
      assert.equal(res.body.valid, false );
      assert.equal(res.body.conflict.length, 1 );
      assert.equal(res.body.conflict[0], "column" );
      
      done();
          });
      });
  
// Check a puzzle placement with multiple placement conflicts: POST request to /api/check

  test('8. Check a puzzle placement with multiple placement conflicts: POST request to /api/check.', function (done) {
    chai
    .request(server)
    .post('/api/check')
    .send({
        coordinate:"a1",
        puzzle: "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
        value: "4"
    })
    .end(function (err, res) {
      //console.log("Res",res.text, res.body.conflict);
      assert.equal(res.status, 200);
      assert.equal(res.type, "application/json");
      assert.equal(res.body.valid, false );
      assert.equal(res.body.conflict.length, 2 );
      assert.equal(res.body.conflict[0], "column" );
      assert.equal(res.body.conflict[1], "region" );
      done();
          });
      });
  
// Check a puzzle placement with all placement conflicts: POST request to /api/check

  test('9. Check a puzzle placement with all placement conflicts: POST request to /api/check.', function (done) {
    chai
    .request(server)
    .post('/api/check')
    .send({
        coordinate:"a1",
        puzzle: "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
        value: "5"
    })
    .end(function (err, res) {
      //console.log("Res",res.text, res.body.conflict);
      assert.equal(res.status, 200);
      assert.equal(res.type, "application/json");
      assert.equal(res.body.valid, false );
      assert.equal(res.body.conflict.length, 3 );
      assert.equal(res.body.conflict[0], "row" );
      assert.equal(res.body.conflict[1], "column" );
      assert.equal(res.body.conflict[2], "region" );
      done();
          });
      });
  
// Check a puzzle placement with missing required fields: POST request to /api/check

  test('10. Check a puzzle placement with missing required fields: POST request to /api/check.', function (done) {
    chai
    .request(server)
    .post('/api/check')
    .send({
        coordinate:"a1",
        puzzle: "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
        value: ""
    })
    .end(function (err, res) {
      //console.log("Res",res.text, res.body.conflict);
      assert.equal(res.status, 200);
      assert.equal(res.type, "application/json");
      assert.equal(res.body.error, 'Required field(s) missing' );
  
      done();
          });
      });
  
// Check a puzzle placement with invalid characters: POST request to /api/check

  test('11. Check a puzzle placement with invalid characters: POST request to /api/check.', function (done) {
    chai
    .request(server)
    .post('/api/check')
    .send({
        coordinate:"a1",
        puzzle: "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
        value: "!"
    })
    .end(function (err, res) {
      //console.log("Res",res.text, res.body.conflict);
      assert.equal(res.status, 200);
      assert.equal(res.type, "application/json");
      assert.equal(res.body.error, 'Invalid value' );
  
      done();
          });
      });
  
// Check a puzzle placement with incorrect length: POST request to /api/check

  test('12. Check a puzzle placement with incorrect length: POST request to /api/check.', function (done) {
    chai
    .request(server)
    .post('/api/check')
    .send({
        coordinate:"a1",
        puzzle: "1..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
        value: "1"
    })
    .end(function (err, res) {
      //console.log("Res",res.text, res.body.conflict);
      assert.equal(res.status, 200);
      assert.equal(res.type, "application/json");
      assert.equal(res.body.error, 'Expected puzzle to be 81 characters long' );
  
      done();
          });
      });
  
// Check a puzzle placement with invalid placement coordinate: POST request to /api/check

  test('13.Check a puzzle placement with invalid placement coordinate: POST request to /api/check.', function (done) {
    chai
    .request(server)
    .post('/api/check')
    .send({
        coordinate:"k1",
        puzzle: "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
        value: "1"
    })
    .end(function (err, res) {
      //console.log("Res",res.text, res.body.conflict);
      assert.equal(res.status, 200);
      assert.equal(res.type, "application/json");
      assert.equal(res.body.error, 'Invalid coordinate' );
  
      done();
          });
      });
  
// Check a puzzle placement with invalid placement value: POST request to /api/check

  test('14. Check a puzzle placement with invalid placement value: POST request to /api/check.', function (done) {
    chai
    .request(server)
    .post('/api/check')
    .send({
        coordinate:"a0",
        puzzle: "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
        value: "1"
    })
    .end(function (err, res) {
      //console.log("Res",res.text, res.body.conflict);
      assert.equal(res.status, 200);
      assert.equal(res.type, "application/json");
      assert.equal(res.body.error, 'Invalid coordinate' );
  
      done();
          });
      });
  

});

