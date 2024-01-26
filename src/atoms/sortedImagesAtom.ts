import { atom } from "jotai";
import { imagesAtom } from "./imagesAtom";
import { imageOrderAtom } from "./imageOrderAtom";

export const sortedImagesAtom = atom(async (get) => {
  const imageOrder = get(imageOrderAtom);
  const images = (await get(imagesAtom)) ?? [];
  return imageOrder === "asc" ? images : [...images].reverse();
});
