// app/utils/date-helpers-024.js
//Author: @abuiles. Taken from https://github.com/abuiles/borrowers/blob/master/app/utils/date-helpers.js
function formatDate(date, format) {
  return window.moment(date).format(format);
}

export {
  formatDate
};
