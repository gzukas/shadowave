import { atom } from 'jotai';
import { imagesAtom } from '@/atoms/imagesAtom';

export const largestImageAtom = atom(get => {
  const images = get(imagesAtom);
  const imagesByArea = [...images].sort(
    (a, b) => a.width * a.height - b.width * b.height
  );
  return imagesByArea.length
    ? imagesByArea[imagesByArea.length - 1]
    : undefined;
});
