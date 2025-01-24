import { atom } from 'jotai';
import { atomWithReset } from 'jotai/utils';
import { largestImageAtom } from '@/atoms/largestImageAtom';

export const MIN_WAVELENGTH = 9;

export const wavelengthAtom = atomWithReset(MIN_WAVELENGTH);

export const maxWavelengthAtom = atom(
  get => get(largestImageAtom)?.width ?? MIN_WAVELENGTH + 1
);
