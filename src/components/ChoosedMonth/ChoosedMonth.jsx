import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { isWithinInterval } from 'date-fns';
import { useDaysOfMonth } from 'hooks/useDaysOfMonth';
import { selectDate } from 'redux/date/dateSelectors';
import { selectArrTasks } from 'redux/tasks/tasksSelectors';
import MonthCalendarHead from './MonthCalendarHead/MonthCalendarHead';
import CalendarTable from './CalendarTable/CalendarTable';
import css from './choosedMonth.module.scss';

const ChoosedMonth = () => {
  const location = useLocation();
  const { pathname } = location;

  const currentDate = useSelector(selectDate);

  const tasks = useSelector(selectArrTasks);

  const { startMonth, endMonth } = useDaysOfMonth(currentDate);

  const filteredDates = tasks.filter(task => {
    const dateObj = new Date(task.date.start);
    return isWithinInterval(dateObj, { start: startMonth, end: endMonth });
  });

  return (
    <>
      <MonthCalendarHead />
      <div
        className={
          pathname.includes('filter')
            ? `${css.choosedMonthWrapper} ${css.filter}`
            : `${css.choosedMonthWrapper} ${css.calendar}`
        }
      >
        <CalendarTable tasks={filteredDates} currentDate={currentDate} />
      </div>
    </>
  );
};

export default ChoosedMonth;
