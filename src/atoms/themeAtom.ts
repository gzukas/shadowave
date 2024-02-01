import { atomWithStorage, createJSONStorage } from 'jotai/utils';

export type Theme = 'dark' | 'light' | 'system';

export const themeAtom = atomWithStorage<Theme>(
  'mei-theme',
  'system',
  createJSONStorage(() => localStorage),
  { getOnInit: true }
);
