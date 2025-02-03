import { atom } from 'jotai';
import { largestImageAtom } from '@/atoms/largestImageAtom';

export const scaleAtom = atom(async get => {
  const largestImage = await get(largestImageAtom);
  if (!largestImage) {
    return 1;
  }
  const { width, height } = largestImage;
  const diagonal = Math.hypot(width, height);
  return Math.max(diagonal / width, diagonal / height);
});
