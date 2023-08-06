import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, parseISO } from 'date-fns';
import { selectDate } from 'redux/date/dateSelectors';
import { setDate } from 'redux/date/dateSlice';
import { getTasksThunk, updateTaskThunk } from 'redux/tasks/tasksOperations';
import './DatePickerStyles.scss';
import css from './calendarDatePicker.module.scss';

const CalendarDatePicker = ({ task }) => {
  const choosedDay = useSelector(selectDate);
  const dateFull = parseISO(choosedDay, 'yyyy-MM-dd');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const newDate = date => {
    const startNew = format(date, 'yyyy-MM-dd') + task.date.start.slice(10, 24);
    const endNew = format(date, 'yyyy-MM-dd') + task.date.end.slice(10, 24);

    const id = task._id;
    const start = startNew;
    const end = endNew;

    const dataTask = {
      title: task.title,
      status: task.status,
      priority: task.priority,
      date: { start, end },
    };

    dispatch(updateTaskThunk({ id, dataTask }))
      .unwrap()
      .then(() => {
        dispatch(getTasksThunk());
      });
  };

  return (
    <>
      {pathname.slice(0, 16) === '/calendar/month/' ||
      pathname.slice(0, 14) === '/filter/month/' ? (
        <DatePicker
          dateFormat="MMMM Y"
          selected={dateFull}
          showMonthYearPicker
          onChange={date => {
            dispatch(setDate(format(date, 'yyyy-MM-dd')));

            if (pathname.slice(0, 16) === '/calendar/month/') {
              navigate(`/calendar/month/${format(date, 'yyyy-MMMM')}`);
            }

            if (pathname.slice(0, 14) === '/filter/month/') {
              navigate(`/filter/month/${format(date, 'yyyy-MMMM')}`);
            }
          }}
          className={css.calendarInput}
          calendarClassName={css.customCalendarStyle}
        />
      ) : (
        <DatePicker
          dateFormat="d MMMM Y"
          selected={dateFull}
          calendarStartDay={1}
          onChange={date => {
            if (task) {
              newDate(date);
            }
            dispatch(setDate(format(date, 'yyyy-MM-dd')));

            if (pathname.slice(0, 14) === '/calendar/day/') {
              navigate(`/calendar/day/${format(date, 'yyyy-MM-dd')}`);
            }

            if (pathname.slice(0, 12) === '/filter/day/') {
              navigate(`/filter/day/${format(date, 'yyyy-MM-dd')}`);
            }
          }}
          className={css.calendarInput}
          calendarClassName={css.customCalendarStyle}
        />
      )}
    </>
  );
};

CalendarDatePicker.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
    date: PropTypes.shape({
      start: PropTypes.string.isRequired,
      end: PropTypes.string.isRequired,
    }).isRequired,
    owner: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        email: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,
      }),
    ]).isRequired,
  }),
};

export default CalendarDatePicker;
