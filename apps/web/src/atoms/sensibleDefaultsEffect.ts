import { atomEffect } from 'jotai-effect';
import { RESET } from 'jotai/utils';
import { largestImageAtom } from '@/atoms/largestImageAtom';
import { amplitudeAtom, maxAmplitudeAtom } from '@/atoms/amplitudeAtoms';
import { wavelengthAtom, maxWavelengthAtom } from '@/atoms/wavelengthAtoms';
import { rotationAtom } from '@/atoms/rotationAtom';

export const sensibleDefaultsEffect = atomEffect((get, set) => {
  const largestImage = get(largestImageAtom);
  const maxWavelength = get(maxWavelengthAtom);
  const maxAmplitude = get(maxAmplitudeAtom);

  set(rotationAtom, RESET);
  set(wavelengthAtom, largestImage ? maxWavelength : RESET);
  set(amplitudeAtom, largestImage ? maxAmplitude : RESET);
});
