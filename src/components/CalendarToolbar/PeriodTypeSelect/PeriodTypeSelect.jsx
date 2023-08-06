import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { format } from 'date-fns';
import { setDate } from 'redux/date/dateSlice';
import css from './periodTypeSelect.module.scss';

export const PeriodTypeSelect = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { pathname } = location;

  const currentDateMonth = format(new Date(), 'yyyy-MMMM');
  const currentDateDay = format(new Date(), 'yyyy-MM-dd');

  const handleClickMonth = road => {
    dispatch(setDate(currentDateDay));

    road === 'calendar'
      ? navigate(`/calendar/month/${currentDateMonth}`)
      : navigate(`/filter/month/${currentDateMonth}`);
  };

  const handleClickDay = road => {
    dispatch(setDate(currentDateDay));

    road === 'calendar'
      ? navigate(`/calendar/day/${currentDateDay}`)
      : navigate(`/filter/day/${currentDateDay}`);
  };

  return (
    <div className={css.periodTypeSelectMarkUp}>
      <button
        className={
          pathname.slice(0, 16) === `/calendar/month/` ||
          pathname.slice(0, 14) === `/filter/month/`
            ? css.activeLinkMonth
            : css.navLinkMonth
        }
        onClick={() => {
          if (pathname.slice(0, 14) === '/calendar/day/') {
            handleClickMonth('calendar');
          }

          if (pathname.slice(0, 12) === '/filter/day/') {
            handleClickMonth('filter');
          }
        }}
      >
        Month
      </button>

      <button
        className={
          pathname.slice(0, 14) === `/calendar/day/` ||
          pathname.slice(0, 12) === `/filter/day/`
            ? css.activeLinkDay
            : css.navLinkDay
        }
        onClick={() => {
          if (pathname.slice(0, 16) === '/calendar/month/') {
            handleClickDay('calendar');
          }

          if (pathname.slice(0, 14) === '/filter/month/') {
            handleClickDay('filter');
          }
        }}
      >
        Day
      </button>
    </div>
  );
};
