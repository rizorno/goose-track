import { Suspense, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAccessToken } from 'redux/auth/authSelectors';
import { getTasksThunk } from 'redux/tasks/tasksOperations';
import CalendarToolbar from 'components/CalendarToolbar/CalendarToolbar';
import css from './calendarPage.module.scss';

const CalendarPage = () => {
  const dispatch = useDispatch();
  const token = useSelector(getAccessToken);

  useEffect(() => {
    token && dispatch(getTasksThunk());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div className={css.calendarPageContainer}>
      <CalendarToolbar />
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default CalendarPage;
