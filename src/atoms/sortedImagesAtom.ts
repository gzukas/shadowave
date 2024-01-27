import { atom } from "jotai";
import { imagesAtom } from "./imagesAtom";
import { areImagesReversedAtom } from "./areImagesReversedAtom";

export const sortedImagesAtom = atom(async (get) => {
  const areImagesReversed = get(areImagesReversedAtom);
  const images = await get(imagesAtom);
  return areImagesReversed ? [...images].reverse() : images;
});
