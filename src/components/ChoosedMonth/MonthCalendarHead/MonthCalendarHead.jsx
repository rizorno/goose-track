import { useMediaQuery } from '@mui/material';
import css from './monthCalendarHead.module.scss';

const MonthCalendarHead = () => {
  const screenMobile = useMediaQuery('(max-width: 767.9px)');

  const dayShot = ['m', 't', 'w', 't', 'f', 's', 's'];
  const dayLong = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sund'];

  const weekdays = type => {
    const weekDay = (type === 'shot' ? dayShot : dayLong).map((w, index) => {
      return (
        <li
          key={w}
          className={(index === 5 || index === 6) && css.monthHeadItem}
        >
          {w}
        </li>
      );
    });
    return weekDay;
  };

  return (
    <>
      {screenMobile ? (
        <ul className={css.monthHeadList}>
          {weekdays('shot')}
          {/* <li>M</li>
          <li>T</li>
          <li>W</li>
          <li>T</li>
          <li>F</li>
          <li className={css.monthHeadItem}>S</li>
          <li className={css.monthHeadItem}>S</li> */}
        </ul>
      ) : (
        <ul className={css.monthHeadList}>
          {weekdays('long')}
          {/* <li>Mon</li>
          <li>Tue</li>
          <li>Wed</li>
          <li>Thu</li>
          <li>Fri</li>
          <li className={css.monthHeadItem}>Sat</li>
          <li className={css.monthHeadItem}>Sun</li> */}
        </ul>
      )}
    </>
  );
};

export default MonthCalendarHead;
