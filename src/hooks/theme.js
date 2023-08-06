import { useLayoutEffect, useState } from 'react';

const darkTheme = window?.matchMedia('(prefers-color-scheme: dark)').matches;
const defaultTheme = darkTheme ? 'dark' : 'light';

export const useTheme = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || defaultTheme
  );

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return { theme, setTheme };
};
