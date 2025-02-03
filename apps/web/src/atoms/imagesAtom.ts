import { atom } from 'jotai';
import { atomWithStorage, RESET, unwrap } from 'jotai/utils';
import { readFile } from '@/utils/readFile';
import { loadImage } from '@/utils/loadImage';
import { createIndexedDbStorage } from '@/utils/createIndexedDbStorage';

let imageId = 0;

const filesAtom = atomWithStorage<Blob[]>(
  'files',
  [],
  createIndexedDbStorage<Blob[]>(),
  { getOnInit: true }
);

export const imagesAtom = atom(
  async get => {
    const files = await get(filesAtom);
    return Promise.all(
      files.map(async file => {
        const dataUrl = (await readFile(r => r.readAsDataURL(file))) as string;
        const image = await loadImage(dataUrl);
        image.id = `${imageId++}`;
        return image;
      })
    );
  },
  (_get, set, files: Blob[] | typeof RESET) => {
    set(filesAtom, files);
  }
);

export const unwrappedImagesAtom = unwrap(imagesAtom, prev => prev ?? []);
