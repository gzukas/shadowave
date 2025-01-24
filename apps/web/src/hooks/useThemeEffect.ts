import { useLayoutEffect } from 'react';
import { useAtomValue } from 'jotai';
import { themeAtom } from '@/atoms/themeAtom';

export function useThemeEffect() {
  const theme = useAtomValue(themeAtom);
  useLayoutEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(
      theme === 'system'
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
        : theme
    );
  }, [theme]);
}
