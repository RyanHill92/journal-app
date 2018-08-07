const moment = require('moment');

function momentMaker (dateArray) {
  switch(dateArray.length) {
    case 1:
      let oneDate = dateArray;
      return moment(oneDate).format("YYYY");
    case 2:
      let twoDate = [
        ...dateArray.slice(0, 1),
        dateArray[1] - 1
      ];
      return moment(twoDate).format("MMM, YYYY");
    case 3:
      let threeDate = [
        ...dateArray.slice(0, 1),
        dateArray[1] - 1,
        dateArray.slice(2)
      ];
      return moment(threeDate).format("ddd, MMM Do, YYYY");
  }
}

// console.log(momentMaker([1992]));
// console.log(momentMaker([1992, 1]));
// console.log(momentMaker([1992, 1, 1]));

module.exports = {momentMaker}
