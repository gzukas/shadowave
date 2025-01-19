import { atomEffect } from 'jotai-effect';
import { largestImageAtom } from './largestImageAtom';
import { amplitudeAtom, maxAmplitudeAtom } from './amplitudeAtoms';
import { wavelengthAtom, maxWavelengthAtom } from './wavelengthAtoms';
import { rotationAtom } from './rotationAtom';
import { RESET } from 'jotai/utils';

export const sensibleDefaultsEffect = atomEffect((get, set) => {
  const abortController = new AbortController();
  (async () => {
    const largestImage = await get(largestImageAtom);
    const maxWavelength = await get(maxWavelengthAtom);
    const maxAmplitude = await get(maxAmplitudeAtom);
    if (!abortController.signal.aborted) {
      set(rotationAtom, RESET);
      set(wavelengthAtom, largestImage ? maxWavelength : RESET);
      set(amplitudeAtom, largestImage ? maxAmplitude : RESET);
    }
  })();

  return () => {
    abortController.abort();
  };
});
