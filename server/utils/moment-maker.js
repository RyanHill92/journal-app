const moment = require('moment');

function momentMaker (dateArray) {
  switch(dateArray.length) {
    //Passed an empty array, returns an empty array.
    case 1:
      let oneDate = dateArray;
      return moment(oneDate).format("YYYY");
      break;
    case 2:
      let twoDate = [
        ...dateArray.slice(0, 1),
        dateArray[1] - 1
      ];
      return moment(twoDate).format("MMM, YYYY");
      break;
    //Trims any arrays longer than three items.
    case 3:
      let threeDate = [
        ...dateArray.slice(0, 1),
        dateArray[1] - 1,
        dateArray.slice(2)
      ];
      return moment(threeDate).format("ddd, MMM Do, YYYY");
      break;
    default:
      return moment().format("ddd, MMM Do, YYYY");
      break;
  }
}

// console.log(momentMaker([1992]));
// console.log(momentMaker([1992, 1]));
// console.log(momentMaker([1992, 1, 1]));

module.exports = {momentMaker}
