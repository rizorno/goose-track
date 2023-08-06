import { getYear } from 'date-fns';
import range from 'lodash/range';

export const years = range(1923, getYear(new Date()) + 1, 1);

export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const weekendDay = date => {
  const day = date.getDay();
  return day === 0 || day === 6; // Sunday and Saturday
};

export const weekendDayClassName = 'weekend-day';
