import { atom } from "jotai";
import { loadImage } from "@/utils/loadImage";
import { readFile } from "@/utils/readFile";

const filesOrImagesAtom = atom<FileList | HTMLImageElement[]>([]);

export const imagesAtom = atom(
  async (get) => {
    const filesOrImages = get(filesOrImagesAtom);
    return Promise.all(
      Array.isArray(filesOrImages)
        ? filesOrImages
        : Array.from(filesOrImages).map(async (file) => {
            const image = await loadImage(
              (await readFile((fr) => fr.readAsDataURL(file))) as string
            );
            image.id = file.name;
            return image;
          })
    );
  },
  (_get, set, filesOrImages: FileList | HTMLImageElement[]) => {
    set(filesOrImagesAtom, filesOrImages);
  }
);
