import { NavLink } from 'react-router-dom';
import logoM1 from 'images/sidebar/GOOSE-m.png';
import logoM2x from 'images/sidebar/GOOSE-m@2x.png';
import logoT1 from 'images/sidebar/GOOSE-t.png';
import logoT2x from 'images/sidebar/GOOSE-t@2x.png';
import logoD1 from 'images/sidebar/GOOSE-d.png';
import logoD2x from 'images/sidebar/GOOSE-d@2x.png';
import css from './logo.module.scss';

const Logo = () => {
  return (
    <NavLink to="/" className={`${css.logoBox} ${css.logoBoxActive}`}>
      <picture className={css.logo}>
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

      <p className={css.logoText}>
        G<span>oo</span>seTrake
      </p>
    </NavLink>
  );
};

export default Logo;
