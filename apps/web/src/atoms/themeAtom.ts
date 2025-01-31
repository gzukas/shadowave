import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export type Theme = 'dark' | 'light' | 'system';

export const themeAtom = atomWithStorage<Theme>('theme', 'system', undefined, {
  getOnInit: true
});

export const appliedThemeAtom = atom<Exclude<Theme, 'system'>>();
