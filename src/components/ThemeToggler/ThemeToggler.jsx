import { useEffect } from 'react';
import { useTheme } from 'hooks/theme';
import icon from 'images/theme/icons.svg';
import css from './themeToggler.module.scss';

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const themeLight = document.getElementById('light-theme-toggle');
    const themeDark = document.getElementById('dark-theme-toggle');
    const dataValue = localStorage.getItem('theme');

    if (dataValue === 'light') {
      themeLight.style.display = 'none';
      themeDark.style.display = 'block';
    } else {
      themeDark.style.display = 'none';
      themeLight.style.display = 'block';
    }
  }, [theme]);

  const handleLightTheme = () => {
    setTheme('light');
  };

  const handleDarkTheme = () => {
    setTheme('dark');
  };

  return (
    <>
      <button
        id="light-theme-toggle"
        className={css.btnLight}
        onClick={handleLightTheme}
      >
        <svg className={css.changeTheme}>
          <use href={icon + '#icon-light'}></use>
        </svg>
      </button>

      <button
        id="dark-theme-toggle"
        className={css.btnDark}
        onClick={handleDarkTheme}
      >
        <svg className={css.changeTheme}>
          <use href={icon + '#icon-dark'}></use>
        </svg>
      </button>
    </>
  );
};

export default ThemeToggler;
