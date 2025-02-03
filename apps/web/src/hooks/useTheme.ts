import { useAtom } from 'jotai';
import { appliedThemeAtom, themeAtom } from '@/atoms/themeAtom';
import { useLayoutEffect } from 'react';

const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

export function useTheme() {
  const [theme, setTheme] = useAtom(themeAtom);
  const [appliedTheme, setAppliedTheme] = useAtom(appliedThemeAtom);

  useLayoutEffect(() => {
    const applyTheme = () => {
      const resolvedTheme =
        theme === 'system'
          ? prefersDarkScheme.matches
            ? 'dark'
            : 'light'
          : theme;

      const root = window.document.documentElement;
      root.classList.toggle('dark', resolvedTheme === 'dark');
      root.classList.toggle('light', resolvedTheme !== 'dark');

      setAppliedTheme(resolvedTheme);
    };

    applyTheme();

    prefersDarkScheme.addEventListener('change', applyTheme);
    return () => prefersDarkScheme.removeEventListener('change', applyTheme);
  }, [theme, setAppliedTheme]);

  return [appliedTheme, setTheme] as const;
}
