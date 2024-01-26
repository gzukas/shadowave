import { atom } from "jotai";
import { loadImage } from "@/utils/loadImage";
import { readFile } from "@/utils/readFile";

const privateImagesAtom = atom<Promise<HTMLImageElement[]> | null>(null);

export const imagesAtom = atom(
  (get) => get(privateImagesAtom),
  async (_get, set, filesOrImages: FileList | HTMLImageElement[] | null) => {
    const images = Array.isArray(filesOrImages)
      ? Promise.resolve(filesOrImages)
      : Promise.all(
          Array.from(filesOrImages ?? []).map(async (file) => {
            const image = await loadImage(
              (await readFile((fr) => fr.readAsDataURL(file))) as string
            );
            image.id = file.name;
            return image;
          })
        );
    set(privateImagesAtom, images);
  }
);
