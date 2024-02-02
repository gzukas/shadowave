import { atomEffect } from 'jotai-effect';
import { largestImageAtom } from './largestImageAtom';
import { amplitudeAtom } from './amplitudeAtom';
import { frequencyAtom } from './frequencyAtom';
import { rotationAtom } from './rotationAtom';
import { scaleAtom } from './scaleAtom';

export const sensibleDefaultsEffect = atomEffect((get, set) => {
  const abortController = new AbortController();
  (async () => {
    const largestImage = await get(largestImageAtom);
    const scale = await get(scaleAtom);
    if (largestImage && !abortController.signal.aborted) {
      set(rotationAtom, 0);
      set(frequencyAtom, Math.round(largestImage.width / Math.PI / scale));
      set(amplitudeAtom, Math.round((largestImage.height * 0.8) / 2 / scale));
    }
  })();

  return () => {
    abortController.abort();
  };
});
