import { atom } from 'jotai';
import { imagesAtom } from '@/atoms/imagesAtom';
import { unwrap } from 'jotai/utils';

export const largestImageAtom = atom(async get => {
  const images = await get(imagesAtom);
  const imagesByArea = [...images].sort(
    (a, b) => a.width * a.height - b.width * b.height
  );
  return imagesByArea.length
    ? imagesByArea[imagesByArea.length - 1]
    : undefined;
});

export const unwrappedLargestImageAtom = unwrap(largestImageAtom);