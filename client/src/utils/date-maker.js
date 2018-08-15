import isBetween from './is-between';
// const {isBetween} = require('./is-between');

function dateMaker(day, month, year) {
  let date = [];
  if (year && isBetween(year, 1800, 2100)) {
    date.push(parseInt(year, 10));
  }
  if (month && isBetween(month, 1, 12)) {
    date.push(parseInt(month, 10));
  }
  if (day && isBetween(day, 1, 31)) {
    date.push(parseInt(day, 10));
  }
  return date;
}

let testOutput = dateMaker('', '', '1992');
console.log(testOutput);

export default dateMaker;
// module.exports = {dateMaker};
