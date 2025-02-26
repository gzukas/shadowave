import { atom } from 'jotai';
import { observe } from 'jotai-effect';
import { atomWithStorage } from 'jotai/utils';

export type Theme = 'dark' | 'light' | 'system';

export const themeAtom = atomWithStorage<Theme>('theme', 'system', undefined, {
  getOnInit: true
});

export const resolvedThemeAtom = atom<Exclude<Theme, 'system'>>();

observe((get, set) => {
  const theme = get(themeAtom);
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

  const resolveTheme = () => {
    const resolvedTheme =
      theme === 'system'
        ? prefersDarkScheme.matches
          ? 'dark'
          : 'light'
        : theme;

    const root = window.document.documentElement;
    root.classList.toggle('dark', resolvedTheme === 'dark');
    root.classList.toggle('light', resolvedTheme !== 'dark');

    set(resolvedThemeAtom, resolvedTheme);
  };

  resolveTheme();

  prefersDarkScheme.addEventListener('change', resolveTheme);
  return () => prefersDarkScheme.removeEventListener('change', resolveTheme);
});
