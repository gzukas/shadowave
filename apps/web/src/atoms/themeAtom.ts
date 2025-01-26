import { atom } from 'jotai';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';

export type Theme = 'dark' | 'light' | 'system';

export const themeAtom = atomWithStorage<Theme>(
  'theme',
  'system',
  createJSONStorage(() => localStorage),
  { getOnInit: true }
);

export const appliedThemeAtom = atom<Exclude<Theme, 'system'>>();
