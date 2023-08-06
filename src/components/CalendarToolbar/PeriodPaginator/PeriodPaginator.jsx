import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { format, parse } from 'date-fns';
import { handleChangeMonth } from 'hooks/handleChangeMonth.js';
import { handleChangeDay } from 'hooks/handleChangeDay.js';
import { setDate } from 'redux/date/dateSlice';
import { selectDate } from 'redux/date/dateSelectors';
import CalendarDatePicker from './CalendarDatePicker/CalendarDatePicker';
import icon from 'images/pagination/arrow.svg';
import css from './periodPaginator.module.scss';

export const PeriodPaginator = () => {
  const choosedDay = useSelector(selectDate);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const dateFull = parse(choosedDay, 'yyyy-MM-dd', Date.now());

  const handlePrevMonth = road => {
    dispatch(setDate(format(handleChangeMonth(dateFull, -1), 'yyyy-MM-dd')));
    road === 'calendar'
      ? navigate(
          `/calendar/month/${format(
            handleChangeMonth(dateFull, -1),
            'yyyy-MMMM'
          )}`
        )
      : navigate(
          `/filter/month/${format(handleChangeMonth(dateFull, 1), 'yyyy-MMMM')}`
        );
  };

  const handleNextMonth = road => {
    dispatch(setDate(format(handleChangeMonth(dateFull, 1), 'yyyy-MM-dd')));
    road === 'calendar'
      ? navigate(
          `/calendar/month/${format(
            handleChangeMonth(dateFull, 1),
            'yyyy-MMMM'
          )}`
        )
      : navigate(
          `/filter/month/${format(handleChangeMonth(dateFull, 1), 'yyyy-MMMM')}`
        );
  };

  const handlePrevDay = road => {
    dispatch(setDate(format(handleChangeDay(dateFull, -1), 'yyyy-MM-dd')));
    road === 'calendar'
      ? navigate(
          `/calendar/day/${format(handleChangeDay(dateFull, -1), 'yyyy-MM-dd')}`
        )
      : navigate(
          `/filter/day/${format(handleChangeDay(dateFull, -1), 'yyyy-MM-dd')}`
        );
  };

  const handleNextDay = road => {
    dispatch(setDate(format(handleChangeDay(dateFull, 1), 'yyyy-MM-dd')));
    road === 'calendar'
      ? navigate(
          `/calendar/day/${format(handleChangeDay(dateFull, 1), 'yyyy-MM-dd')}`
        )
      : navigate(
          `/filter/day/${format(handleChangeDay(dateFull, 1), 'yyyy-MM-dd')}`
        );
  };

  return (
    <div className={css.wrapper}>
      <div className={css.nameContainer}>
        <CalendarDatePicker />
      </div>

      <div className={css.btnContainer}>
        <button
          className={`${css.btn} ${css.btnLeft}`}
          type="button"
          onClick={() => {
            if (pathname.slice(0, 16) === '/calendar/month/') {
              handlePrevMonth('calendar');
            }

            if (pathname.slice(0, 14) === '/filter/month/') {
              handlePrevMonth('filter');
            }

            if (pathname.slice(0, 14) === '/calendar/day/') {
              handlePrevDay('calendar');
            }

            if (pathname.slice(0, 12) === '/filter/day/') {
              handlePrevDay('filter');
            }
          }}
        >
          <svg>
            <use href={icon + '#arrow-left'}></use>
          </svg>
        </button>

        <button
          className={`${css.btn} ${css.btnRight}`}
          type="button"
          onClick={() => {
            if (pathname.slice(0, 16) === '/calendar/month/') {
              handleNextMonth('calendar');
            }

            if (pathname.slice(0, 14) === '/filter/month/') {
              handleNextMonth('filter');
            }

            if (pathname.slice(0, 14) === '/calendar/day/') {
              handleNextDay('calendar');
            }

            if (pathname.slice(0, 12) === '/filter/day/') {
              handleNextDay('filter');
            }
          }}
        >
          <svg>
            <use href={icon + '#arrow-right'}></use>
          </svg>
        </button>
      </div>
    </div>
  );
};
