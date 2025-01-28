import { atom } from 'jotai';
import { defaultRotationAtom, rotationAtom } from './rotationAtom';
import { defaultWavelengthAtom, wavelengthAtom } from './wavelengthAtoms';
import { amplitudeAtom, defaultAmplitudeAtom } from './amplitudeAtoms';
import { RESET } from 'jotai/utils';

export const resetAtom = atom(
  get => {
    return (
      get(rotationAtom) !== get(defaultRotationAtom) ||
      get(wavelengthAtom) !== get(defaultWavelengthAtom) ||
      get(amplitudeAtom) !== get(defaultAmplitudeAtom)
    );
  },
  (_get, set) => {
    set(rotationAtom, RESET);
    set(wavelengthAtom, RESET);
    set(amplitudeAtom, RESET);
  }
);
