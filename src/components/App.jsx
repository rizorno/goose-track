import { useEffect, lazy, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  refreshTokenThunk,
  getCurrentUserThunk,
} from 'redux/auth/authOperations';
import {
  getAccessToken,
  getRefreshTime,
  getErrorUser,
} from 'redux/auth/authSelectors';
import { selectErrorTasks } from 'redux/tasks/tasksSelectors';
import PublicRoute from './PublicRoute/PublicRoute';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import MainLayout from './MainLayout/MainLayout';

const CalendarPage = lazy(() => import('pages/CalendarPage/CalendarPage'));
const ChoosedMonth = lazy(() => import('./ChoosedMonth/ChoosedMonth'));
const ChoosedDay = lazy(() => import('./ChoosedDay/ChoosedDay'));
const FilterPage = lazy(() => import('pages/FilterPage/FilterPage'));

const MainPage = lazy(() => import('pages/MainPage/MainPage'));
const RegisterPage = lazy(() => import('pages/AuthPage/RegisterPage'));
const LoginPage = lazy(() => import('pages/AuthPage/LoginPage'));
const AccountPage = lazy(() => import('pages/AccountPage/AccountPage'));

export const App = () => {
  const token = useSelector(getAccessToken);
  const time = useSelector(getRefreshTime);
  const errorUser = useSelector(getErrorUser);
  const errorTasks = useSelector(selectErrorTasks);
  const dispatch = useDispatch();

  useEffect(() => {
    // refresh 2 minutes in ms before expiry
    // milliseconds * seconds * minutes * hours * days
    const refreshInterval =
      time - new Date().getTime() === 1000 * 60 * 2 * 1 * 1
        ? 0
        : time - new Date().getTime() < 1000 * 60 * 2 * 1 * 1
        ? 1000 * 60 * 2 * 1 * 1
        : time - new Date().getTime() - 1000 * 60 * 2 * 1 * 1;

    if (time) {
      setInterval(() => {
        dispatch(refreshTokenThunk());
      }, refreshInterval);
    } else {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (errorUser !== null || errorTasks !== null) {
      dispatch(refreshTokenThunk());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorUser, errorTasks]);

  useEffect(() => {
    token && dispatch(getCurrentUserThunk());
  }, [dispatch, token]);

  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<PublicRoute component={<MainPage />} />} />
        <Route
          path="/login"
          element={<PublicRoute component={<LoginPage />} />}
        />
        <Route
          path="/register"
          element={<PublicRoute component={<RegisterPage />} />}
        />
        <Route path="/" element={<PrivateRoute component={<MainLayout />} />}>
          <Route path="/account" element={<AccountPage />} />
          <Route path="/calendar" element={<CalendarPage />}>
            <Route path="month/:currentDate" element={<ChoosedMonth />} />
            <Route path="day/:currentDay" element={<ChoosedDay />} />
          </Route>
          <Route path="/filter" element={<FilterPage />}>
            <Route path="month/:currentDate" element={<ChoosedMonth />} />
            <Route path="day/:currentDay" element={<ChoosedDay />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
};

export default App;
