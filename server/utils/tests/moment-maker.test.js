const {momentMaker} = require('./../moment-maker');
const expect = require('expect');

describe('moment maker', function () {
  it('should turn an array of three numbers into a day, month, and year string', function () {
    let date = momentMaker([2018, 8, 8]);
    expect(date).toBe('Wed, Aug 8th, 2018');
  });

  it('should turn an array of two numbers into a month and year string', function (){
    let date = momentMaker([2018, 8]);
    expect(date).toBe('Aug, 2018');
  });

  it('should turn an array of one number into a year string', function() {
    let date = momentMaker([2018]);
    expect(date).toBe('2018');
  });

  it('should turn an array of more than three items into a day, month, and year string', function (){
    let date = momentMaker([2018, 8, 8, 8, 8]);
    expect(date).toBe('Wed, Aug 8th, 2018');
  });

  it('should return the current date for an empty array', function () {
    let date = momentMaker([]);
    expect(date).toBe('Wed, Aug 8th, 2018');
  });
});
