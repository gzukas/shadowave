import { atom } from 'jotai';
import { largestImageAtom } from './largestImageAtom';

export const scaleAtom = atom(async get => {
  const largestImage = await get(largestImageAtom);
  if (!largestImage) {
    return 1;
  }
  const { width, height } = largestImage;
  const diagonal = Math.sqrt(width ** 2 + height ** 2);
  return Math.max(
    ...[largestImage.width, largestImage.height].map(x => diagonal / x)
  );
});
