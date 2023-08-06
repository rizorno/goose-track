import { useDispatch } from 'react-redux';
import { clearAuthHeader } from 'services/http';
import { logOutThunk } from 'redux/auth/authOperations';
import icon from 'images/sidebar/icons.svg';
import css from './logoutBtn.module.scss';

const LogoutBtn = () => {
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOutThunk());
    clearAuthHeader();
  };

  return (
    <button className={css.logoutBox} onClick={handleLogOut} type="button">
      <span className={css.text}>Log out</span>
      <svg className={css.icon}>
        <use href={icon + '#icon-logOut'} className={css.icon}></use>
      </svg>
    </button>
  );
};

export default LogoutBtn;
