import { atom } from 'jotai';
import { atomWithReset } from 'jotai/utils';
import { largestImageAtom } from './largestImageAtom';

export const MIN_AMPLITUDE = 0;

export const amplitudeAtom = atomWithReset(MIN_AMPLITUDE);

export const maxAmplitudeAtom = atom(async get => {
  const largestImage = await get(largestImageAtom);
  return largestImage ? Math.round(largestImage.height / 8) : MIN_AMPLITUDE + 1;
});
