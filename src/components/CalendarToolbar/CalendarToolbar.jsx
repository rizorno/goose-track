import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import { format } from 'date-fns';
import { PeriodPaginator } from './PeriodPaginator/PeriodPaginator';
import { Filter } from 'components/Filter/Filter';
import { PeriodTypeSelect } from './PeriodTypeSelect/PeriodTypeSelect';
import css from './calendarToolbar.module.scss';

const CalendarToolbar = () => {
  const screenMobile = useMediaQuery('(max-width: 767.9px)');
  const screenDesktop = useMediaQuery('(min-width: 1440px)');

  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const formattedCurrentDate = format(new Date(), 'yyyy-MMMM');

  useEffect(() => {
    if (location.pathname === '/calendar') {
      navigate(`/calendar/month/${formattedCurrentDate}`);
    }

    if (location.pathname === '/filter') {
      navigate(`/filter/month/${formattedCurrentDate}`);
    }
  }, [formattedCurrentDate, navigate, location.pathname]);

  return (
    <div className={css.wrapper}>
      <PeriodPaginator />
      {screenMobile || screenDesktop
        ? pathname.slice(0, 7) === '/filter' && <Filter />
        : null}
      <PeriodTypeSelect />
      {screenMobile || screenDesktop
        ? null
        : pathname.slice(0, 7) === '/filter' && <Filter />}
    </div>
  );
};

export default CalendarToolbar;
