//Author: @abuiles. Taken from https://github.com/abuiles/borrowers/blob/master/app/helpers/formatted-date.js
import { helper as buildHelper } from '@ember/component/helper';

// We are consuming the function defined in our utils/date-helpers.
import { formatDate } from '../utils/date-helpers';

export function formattedDate([date, format]) {
  return formatDate(date, format);
}

export default buildHelper(formattedDate);
