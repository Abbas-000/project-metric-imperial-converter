/*
*
*
*       Complete the handler logic below
*
*
*/

function ConvertHandler() {

  this.getNum = function(input) {
    var result;
    if (!input) {
      // console.log('inside invalid number and unit');
      return 'invalid number and unit';
    } else if (/\d+/.test(input) === false) {
      // console.log('inside no numbers');
      return 1;
    } else {
      var slashFinder = input.match(/\//g);
      if (slashFinder != null && slashFinder.length >= 2) {
        // console.log('inside double slash');
        return 'invalid number';
      }
      try {
        // console.log(input.match(/[\d./]+/g));
        result = eval(input.match(/[\d./]+/g)[0]);
        result = Number(result.toFixed(5));
      } catch (e) {
        // console.log(e);
        result = 'invalid number';
      } finally {
        // console.log(result);
        return result;
      }
    }
  };

  this.getUnit = function(input) {
    if (!input) return 'invalid number and unit';
    var wordOnly = input.split(/[^A-Za-z]/g).filter(ele => ele.length >= 1);
    if (wordOnly.length === 0) {
      // console.log(wordOnly+'   no unit');
      return 'no unit';
    } else {
      var units = ['gal', 'kg', 'mi', 'km', 'lbs', 'l', 'GAL', 'LBS', 'MI', 'KM', 'L', 'KG'];
      if (units.indexOf(wordOnly[0]) === -1) {
        // console.log('this is an invalid unit.');
        return 'invalid unit';
      } else {
        var validUnit = units[units.indexOf(wordOnly[0])];
        // console.log('unit is         '+ validUnit);
        return validUnit;
      }
    }
  };

  this.getReturnUnit = function(initUnit) {
    var result;
    switch (initUnit.toLowerCase()) {
      case 'gal':
        result = 'l';
        break;
      case 'l':
        result = 'gal';
        break;
      case 'mi':
        result = 'km';
        break;
      case 'km':
        result = 'mi';
        break;
      case 'lbs':
        result = 'kg';
        break;
      case 'kg':
        result = 'lbs';
        break;
    }
    return result;
  };

  this.spellOutUnit = function(unit) {
    var result;
    switch (unit.toLowerCase()) {
      case 'gal':
        result = 'gallons';
        break;
      case 'l':
        result = 'liters';
        break;
      case 'mi':
        result = 'miles';
        break;
      case 'km':
        result = 'kilometers';
        break;
      case 'lbs':
        result = 'pounds';
        break;
      case 'kg':
        result = 'kilograms';
        break;
    }
    return result;
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    var result;
    if (initNum === 'invalid number and unit' || initUnit === 'invalid number and unit') {
      return 'invalid number and unit';
    } else if (initNum === 'invalid number' && initUnit === 'invalid unit') {
      return 'invalid number and unit';
    } else if (initNum === 'invalid number') {
      return initNum;
    } else if (initUnit === 'no unit') {
      return initUnit;
    } else if (initUnit === 'invalid unit') {
      return initUnit;
    } else {
      switch (initUnit.toLowerCase()) {
        case 'gal':
          result = galToL * initNum;
          // console.log(initNum, result);
          break;
        case 'lbs':
          result = lbsToKg * initNum;
          // console.log(initNum, result);
          break;
        case 'mi':
          result = miToKm * initNum;
          // console.log(initNum, result);
          break;
        case 'l':
          result = initNum / galToL;
          // console.log(initNum, result);
          break;
        case 'kg':
          result = initNum / lbsToKg;
          // console.log(initNum, result);
          break;
        case 'km':
          result = initNum / miToKm;
          // console.log(initNum, result);
          break;
      }
      return Number(result.toFixed(5));
    }
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    var result;
    result = {initNum, initUnit, returnNum, returnUnit, string: `${initNum} ${this.spellOutUnit(initUnit)} converts to ${this.convert(initNum, initUnit)} ${this.spellOutUnit(returnUnit)}`};
    return result;
  };

}

module.exports = ConvertHandler;
