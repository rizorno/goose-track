import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import icon from 'images/sidebar/icons.svg';
import css from './userNav.module.scss';

const UserNav = ({ openSidebar }) => {
  return (
    <nav>
      <NavLink
        to="/account"
        className={({ isActive }) =>
          isActive ? `${css.link} ${css.activeLink}` : css.link
        }
        onClick={() => openSidebar()}
      >
        <svg className={css.icon}>
          <use href={icon + '#icon-user'}></use>
        </svg>

        <p className={css.text}>My account</p>
      </NavLink>

      <NavLink
        to="/calendar"
        className={({ isActive }) =>
          isActive ? `${css.link} ${css.activeLink}` : css.link
        }
        onClick={() => openSidebar()}
      >
        <svg className={css.icon}>
          <use href={icon + '#icon-calendar'}></use>
        </svg>
        <p className={css.text}>Calendar</p>
      </NavLink>

      <NavLink
        to="/filter"
        className={({ isActive }) =>
          isActive ? `${css.link} ${css.activeLink}` : css.link
        }
        onClick={() => openSidebar()}
      >
        <svg className={css.icon}>
          <use href={icon + '#icon-filter'}></use>
        </svg>
        <p className={css.text}>Filter</p>
      </NavLink>
    </nav>
  );
};

UserNav.propTypes = {
   openSidebar: PropTypes.func,
 };

export default UserNav;
