import { atom } from 'jotai';
import { areImagesReversedAtom } from './areImagesReversedAtom';
import { imagesAtom } from './imagesAtom';

export const orderedImagesAtom = atom(async get => {
  const areImagesReversed = get(areImagesReversedAtom);
  const images = await get(imagesAtom);
  return areImagesReversed ? [...images].reverse() : images;
});
