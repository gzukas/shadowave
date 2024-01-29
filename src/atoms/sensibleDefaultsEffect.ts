import { atomEffect } from 'jotai-effect';
import { largestImageAtom } from './largestImageAtom';
import { amplitudeAtom } from './amplitudeAtom';
import { frequencyAtom } from './frequencyAtom';
import { rotationAtom } from './rotationAtom';

export const sensibleDefaultsEffect = atomEffect((get, set) => {
  const abortController = new AbortController();
  (async () => {
    const largestImage = await get(largestImageAtom);
    if (largestImage && !abortController.signal.aborted) {
      set(rotationAtom, 0);
      set(frequencyAtom, largestImage.width / Math.PI / 2);
      set(amplitudeAtom, (largestImage.height * 0.8) / 2 / 2);
    }
  })();

  return () => {
    abortController.abort();
  };
});
