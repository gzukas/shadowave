import { atom } from 'jotai';
import { atomWithReset, RESET } from 'jotai/utils';
import { rotationAtom } from './rotationAtom';
import { wavelengthAtom } from './wavelengthAtoms';
import { amplitudeAtom } from './amplitudeAtoms';

const baseImagesAtom = atomWithReset<HTMLImageElement[]>([]);

export const imagesAtom = atom(
  get => get(baseImagesAtom),
  (_get, set, value: HTMLImageElement[] | typeof RESET) => {
    set(baseImagesAtom, value);
    if (value === RESET) {
      set(rotationAtom, value);
      set(wavelengthAtom, value);
      set(amplitudeAtom, value);
    }
  }
);
