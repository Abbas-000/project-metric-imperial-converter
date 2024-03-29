/*
*
*
*       FILL IN EACH UNIT TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]----
*       (if additional are added, keep them at the very end!)
*/

var chai = require('chai');
var assert = chai.assert;
var ConvertHandler = require('../controllers/convertHandler.js');

var convertHandler = new ConvertHandler();

suite('Unit Tests', function(){

  suite('Function convertHandler.getNum(input)', function() {

    test('Whole number input', function(done) {
      var input = '32L';
      assert.equal(convertHandler.getNum(input),32);
      done();
    });

    test('Decimal Input', function(done) {
      var input = '5.4km';
      assert.equal(convertHandler.getNum(input), 5.4);
      done();
    });

    test('Fractional Input', function(done) {
      var input = '5/7gal';
      assert.equal(convertHandler.getNum(input), 0.71429);
      done();
    });

    test('Fractional Input w/ Decimal', function(done) {
      var input = '3.3/4.2mi';
      assert.equal(convertHandler.getNum(input), 0.78571);
      done();
    });

    test('Invalid Input (double fraction)', function(done) {
      var input = '7//2l';
      assert.equal(convertHandler.getNum(input), 'invalid number');
      done();
    });

    test('No Numerical Input', function(done) {
      var inputOne = 'bVSyr';
      var inputTwo = 'km';
      assert.equal(convertHandler.getNum(inputOne), 1);
      assert.equal(convertHandler.getNum(inputTwo), 1);
      done();
    });

  });

  suite('Function convertHandler.getUnit(input)', function() {

    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      input.forEach(function(ele) {
        assert.equal(convertHandler.getUnit(54.2/2+ele), ele)
      });
      done();
    });

    test('Unknown Unit Input', function(done) {
      var input = '24.2kmas';
      assert.equal(convertHandler.getUnit(input), 'invalid unit');
      done();
    });

  });

  suite('Function convertHandler.getReturnUnit(initUnit)', function() {

    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg'];
      var expect = ['l','gal','km','mi','kg','lbs'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });

  });

  suite('Function convertHandler.spellOutUnit(unit)', function() {

    test('For Each Valid Unit Inputs', function(done) {
      var accronym = ['gal','l','mi','km','lbs','kg'];
      var fullName = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms'];
      accronym.forEach(function(ele, i) {
        assert.equal(convertHandler.spellOutUnit(ele), fullName[i]);
      });
      done();
    });

  });

  suite('Function convertHandler.convert(num, unit)', function() {

    test('Gal to L', function(done) {
      var input = [5, 'gal'];
      var expected = 18.92705;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });

    test('L to Gal', function(done) {
      var input = [10, 'l'];
      var expected = 2.64172;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1);
      done();
    });

    test('Mi to Km', function(done) {
      var input = [6, 'mi'];
      var expected = 9.65606;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1);
      done();
    });

    test('Km to Mi', function(done) {
      var input = [4, 'km'];
      var expected = 2.48548;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1);
      done();
    });

    test('Lbs to Kg', function(done) {
      var input = [8, 'lbs'];
      var expected = 3.62873;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1);
      done();
    });

    test('Kg to Lbs', function(done) {
      var input = [2, 'kg'];
      var expected = 4.40924;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1);
      done();
    });

  });

});
