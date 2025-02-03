import { atom } from 'jotai';
import { areImagesReversedAtom } from '@/atoms/areImagesReversedAtom';
import { imagesAtom } from '@/atoms/imagesAtom';

export const orderedImagesAtom = atom(async get => {
  const areImagesReversed = get(areImagesReversedAtom);
  const images = await get(imagesAtom);
  return areImagesReversed ? [...images].reverse() : images;
});
