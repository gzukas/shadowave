import { themeAtom } from '@/atoms/themeAtom';
import { useAtomValue } from 'jotai';
import { useLayoutEffect } from 'react';

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
