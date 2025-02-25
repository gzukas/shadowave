import { atom } from 'jotai';
import { imagesAtom } from '@/atoms/imagesAtom';
import { unwrap } from 'jotai/utils';

export const largestImageAtom = atom(async get => {
  const images = await get(imagesAtom);
  const largestImage = [...images]
    .sort((a, b) => a.width * a.height - b.width * b.height)
    .pop();
  return largestImage;
});

export const unwrappedLargestImageAtom = unwrap(largestImageAtom);
