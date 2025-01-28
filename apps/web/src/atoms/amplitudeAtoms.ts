import { atom } from 'jotai';
import { atomWithDefault } from 'jotai/utils';
import { largestImageAtom } from '@/atoms/largestImageAtom';

export const MIN_AMPLITUDE = 0;

export const defaultAmplitudeAtom = atom(get => {
  const largestImage = get(largestImageAtom);
  return largestImage ? get(maxAmplitudeAtom) : MIN_AMPLITUDE;
});

export const amplitudeAtom = atomWithDefault(get => get(defaultAmplitudeAtom));

export const maxAmplitudeAtom = atom(get => {
  const largestImage = get(largestImageAtom);
  return largestImage ? Math.round(largestImage.height / 8) : MIN_AMPLITUDE + 1;
});
