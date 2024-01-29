import { atomEffect } from 'jotai-effect';
import { themeAtom } from './themeAtom';

export const themeEffect = atomEffect(get => {
  const theme = get(themeAtom);
  const root = window.document.documentElement;
  root.classList.remove('light', 'dark');

  if (theme === 'system') {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light';

    root.classList.add(systemTheme);
    return;
  }

  root.classList.add(theme);
});
