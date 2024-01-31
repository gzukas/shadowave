import { ExtractAtomValue, atom } from 'jotai';
import { loadImage } from '@/utils/loadImage';
import { readFile } from '@/utils/readFile';
import { unwrap } from 'jotai/utils';

export const filesOrLinksAtom = atom<FileList | string[]>([]);

export const imagesAtom = atom(
  async get => {
    const filesOrLinks = get(filesOrLinksAtom);
    return Promise.all(
      [...filesOrLinks].map(async fileOrLink => {
        const [name, blob] =
          typeof fileOrLink === 'string'
            ? [fileOrLink, await (await fetch(fileOrLink)).blob()]
            : [fileOrLink.name, fileOrLink];

        const dataUrl = (await readFile(fr =>
          fr.readAsDataURL(blob)
        )) as string;

        const image = await loadImage(dataUrl);
        image.id = name;
        return image;
      })
    );
  },
  (_get, set, filesOrLinks: ExtractAtomValue<typeof filesOrLinksAtom>) => {
    set(filesOrLinksAtom, filesOrLinks);
  }
);

export const imageCountAtom = atom(get => {
  return get(unwrap(imagesAtom))?.length ?? 0;
});
