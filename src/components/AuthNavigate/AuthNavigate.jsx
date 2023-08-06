import { Link } from 'react-router-dom';
import css from './authNavigate.module.scss';

const AuthNavigate = ({ route, text }) => (
  <Link className={css.link} to={route}>
    {text}
  </Link>
);

export default AuthNavigate;
