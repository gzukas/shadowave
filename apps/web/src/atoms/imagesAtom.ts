import { atom } from 'jotai';
import { atomWithStorage, unwrap } from 'jotai/utils';
import { Type } from '@sinclair/typebox';
import { readFileAsDataURL } from '@/utils/readFile';
import { loadImage } from '@/utils/loadImage';
import { createIdbKeyvalStorage } from '@/utils/createIdbKeyvalStorage';
import { withStorageValidator } from '@/utils/withStorageValidator';

const ImageFileSchema = Type.Tuple([
  Type.String({ title: 'filename' }),
  Type.Unsafe<Blob>(Type.Any({ type: 'object' }))
]);

const ImageFilesSchema = Type.Array(ImageFileSchema);

export type ImageFile = typeof ImageFileSchema.static;

export const imageFilesAtom = atomWithStorage(
  'images',
  [],
  withStorageValidator(ImageFilesSchema)(createIdbKeyvalStorage()),
  {
    getOnInit: true
  }
);

export const imagesAtom = atom(async (get, options) => {
  const imageFiles = await get(imageFilesAtom);
  return Promise.all(
    imageFiles.map(async ([id, file]) => {
      const dataUrl = await readFileAsDataURL(file, options);
      const image = await loadImage(dataUrl, options);
      image.id = id;
      return image;
    })
  );
});

export const unwrappedImagesAtom = unwrap(imagesAtom, prev => prev ?? []);
