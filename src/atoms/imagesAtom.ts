import { ExtractAtomValue, atom } from "jotai";
import { loadImage } from "@/utils/loadImage";
import { readFile } from "@/utils/readFile";

type Image = [name: string, src: string];

const filesOrImagesAtom = atom<FileList | Image[]>([]);

export const imagesAtom = atom(
  async (get) => {
    const filesOrImages = get(filesOrImagesAtom);
    const images = Array.isArray(filesOrImages)
      ? filesOrImages
      : await Promise.all(
          [...filesOrImages].map<Promise<Image>>(async (file) => [
            file.name,
            (await readFile((fr) => fr.readAsDataURL(file))) as string,
          ])
        );
    return Promise.all(
      images.map(async ([name, src]) => {
        const image = await loadImage(src);
        image.id = name;
        return image;
      })
    );
  },
  (_get, set, filesOrImages: ExtractAtomValue<typeof filesOrImagesAtom>) => {
    set(filesOrImagesAtom, filesOrImages);
  }
);
