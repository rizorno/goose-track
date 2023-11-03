import { useMediaQuery } from '@mui/material';
import css from './monthCalendarHead.module.scss';

const MonthCalendarHead = () => {
  const screenMobile = useMediaQuery('(max-width: 767.9px)');

  const dayShot = ['m', 't', 'w', 't', 'f', 's', 's'];
  const dayLong = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

  const weekdays = type => {
    const weekDay = (type === 'shot' ? dayShot : dayLong).map((w, index) => {
      return (
        <li
          key={index}
          className={
            index === 5 || index === 6 ? css.monthHeadItem : css.dayItem
          }
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
        <ul className={css.monthHeadList}>{weekdays('shot')}</ul>
      ) : (
        <ul className={css.monthHeadList}>{weekdays('long')}</ul>
      )}
    </>
  );
};

export default MonthCalendarHead;
