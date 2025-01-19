import { atom } from 'jotai';
import { atomWithReset } from 'jotai/utils';
import { largestImageAtom } from './largestImageAtom';

export const MIN_WAVELENGTH = 9;

export const wavelengthAtom = atomWithReset(MIN_WAVELENGTH);

export const maxWavelengthAtom = atom(
  async get => (await get(largestImageAtom))?.width ?? MIN_WAVELENGTH + 1
);
