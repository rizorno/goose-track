import { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { getUser, getUserAvatar } from 'redux/auth/authSelectors';
import { selectArrTasks } from 'redux/tasks/tasksSelectors';
import { selectDate } from 'redux/date/dateSelectors';
import ThemeToggler from 'components/ThemeToggler/ThemeToggler';
import logoD1 from 'images/header/logo.png';
import logoD2x from 'images/header/logo@2x.png';
import icon from 'images/sidebar/icons.svg';
import css from './header.module.scss';

const Header = ({ openSidebar }) => {
  const userName = useSelector(getUser);
  const userAvatar = useSelector(getUserAvatar);
  const params = useParams();
  const location = useLocation();
  const { pathname } = location;

  const arrTasks = useSelector(selectArrTasks);
  const currentDay = useSelector(selectDate);
  const [filter, setFilter] = useState(null);

  useEffect(() => {
    const filteredTasks = arrTasks?.filter(
      t => t.date.start.slice(0, 10) === currentDay
    );

    setFilter(filteredTasks.length);
  }, [arrTasks, currentDay]);

  return (
    <header className={css.header}>
      <div className={css.container}>
        <button className={css.closeBtn} onClick={() => openSidebar()}>
          <svg className={css.icon}>
            <use href={icon + '#icon-burgerMenu'}></use>
          </svg>
        </button>

        <div className={css.titleBox}>
          {filter > 0 && params.currentDay ? (
            <picture className={css.logo}>
              <source
                srcSet={`${logoD1} 1x, ${logoD2x} 2x`}
                media="(min-width: 1440px)"
                type="image/png"
              />

              <img src={`${logoD1} 1x, ${logoD2x} 2x`} alt="goose" />
            </picture>
          ) : null}

          <div className={css.description}>
            <p className={css.titlePage}>
              {pathname.slice(0, 8) === '/account'
                ? 'User Profile'
                : pathname.slice(0, 9) === '/calendar'
                ? 'Calendar'
                : 'Filter Calendar'}
            </p>

            {filter > 0 && params.currentDay ? (
              <p className={css.message}>
                <span className={css.textBlue}>Let go</span> of the past and
                focus on the present!
              </p>
            ) : null}
          </div>
        </div>

        <div className={css.boxContent}>
          <ThemeToggler />

          <Link to="/account" className={css.name}>
            {userName.name}
          </Link>

          <div className={css.avatar}>
            {userAvatar && (
              <img src={userAvatar} className={css.imgAva} alt="user avatar" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  openSidebar: PropTypes.func,
};

export default Header;
