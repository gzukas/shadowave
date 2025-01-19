import { atom } from 'jotai';
import { imagesAtom } from './imagesAtom';

export const largestImageAtom = atom(async get => {
  const images = await get(imagesAtom);
  const imagesByArea = [...images].sort(
    (a, b) => a.width * a.height - b.width * b.height
  );
  return imagesByArea.length
    ? imagesByArea[imagesByArea.length - 1]
    : undefined;
});
