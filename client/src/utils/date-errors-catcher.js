export default function dateErrorsCatcher(day, month, year) {
  let errors = {};

  if (!year && !month && day) {
    errors.year = 'Please specify a year.';
    errors.month = 'Please specify a month.';
  } else if (!year && month) {
    errors.year = 'Please specify a year.';
  } else if (!month && day) {
    errors.month = 'Please specify a month.';
  }

  if (month && month > 12) {
    errors.month = 'Please specify a real month.';
  }

  if (day && day > 31) {
    errors.day = 'Please specify a real day.';
  }

  if (year && year.length !== 4) {
    errors.year = 'Please specify a real year.';
  }

  let numOfErrors = Object.keys(errors).length;

  return {
    errors,
    isError: numOfErrors > 0
  };
}
