import { atom } from 'jotai';
import { atomWithDefault } from 'jotai/utils';
import { largestImageAtom } from '@/atoms/largestImageAtom';

export const MIN_WAVELENGTH = 9;

export const defaultWavelengthAtom = atom(get => {
  const largestImage = get(largestImageAtom);
  return largestImage ? get(maxWavelengthAtom) : MIN_WAVELENGTH
});

export const wavelengthAtom = atomWithDefault(get => get(defaultWavelengthAtom));

export const maxWavelengthAtom = atom(
  get => get(largestImageAtom)?.width ?? MIN_WAVELENGTH + 1
);
