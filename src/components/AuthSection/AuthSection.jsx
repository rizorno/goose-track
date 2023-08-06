import { Link } from 'react-router-dom';
import logoM1 from 'images/auth/GOOSE-m.png';
import logoM2x from 'images/auth/GOOSE-m@2x.png';
import logoT1 from 'images/auth/GOOSE-t.png';
import logoT2x from 'images/auth/GOOSE-t@2x.png';
import logoD1 from 'images/auth/GOOSE-d.png';
import logoD2x from 'images/auth/GOOSE-d@2x.png';
import icon from 'images/auth/auth.svg';
import css from './authSection.module.scss';

const AuthSection = () => {
  return (
    <section className={css.authSection}>
      <div className={css.authContainer}>
        <picture>
          <source
            srcSet={`${logoD1} 1x, ${logoD2x} 2x`}
            media="(min-width: 1440px)"
            type="image/png"
          />
          <source
            srcSet={`${logoT1} 1x, ${logoT2x} 2x`}
            media="(min-width: 768px)"
            type="image/png"
          />
          <source
            srcSet={`${logoM1} 1x, ${logoM2x} 2x`}
            media="(max-width: 767px)"
            type="image/png"
          />
          <img src={`${logoM1} 1x, ${logoM2x} 2x`} alt="logo goose" />
        </picture>

        <h1 className={css.logoTitle}>
          G<span>oo</span>seTrack
        </h1>

        <div className={css.linkWrapper}>
          <Link className={css.linkBox} to="/login">
            <p>Log in</p>
            <svg className={css.linkIcon}>
              <use href={icon + '#icon-log-in'} />
            </svg>
          </Link>

          <Link className={css.singUp} to="/register">
            Sign Up
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AuthSection;
