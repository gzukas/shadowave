import { atomWithReset } from 'jotai/utils';
import { deviceType, url } from '@workspace/schema';
import { client } from '@/utils/client';
import { readFile } from '@/utils/readFile';
import { loadImage } from '@/utils/loadImage';
import { imagesAtom } from '@/atoms/imagesAtom';
import { atomWithExpiringWriteState } from '@/utils/atomWithExpiringWriteState';

export type Site = { url: typeof url.static; deviceType: typeof deviceType.static };
export type ImageSource = Site | File | string;

export const imageSourcesAtom = atomWithReset<ImageSource[]>([]);

export const importAtom = atomWithExpiringWriteState(
  async (_get, set, imageSources: ImageSource[]) => {
    const blobsByName = await Promise.all(
      imageSources.flatMap<Promise<Array<[string, Blob]>>>(async source => {
        if (source instanceof File) {
          return [[source.name, source]];
        }
        if (typeof source === 'string') {
          const blob = await (await fetch(source)).blob();
          return [[source, blob]];
        }
        const { data } = await client
          .screenshots({
            url: encodeURIComponent(source.url)
          })
          .get({ query: source });

        return Object.entries(data || {});
      })
    );
    const images = await Promise.all(
      blobsByName.flat().map(async ([name, blob]) => {
        const dataUrl = (await readFile(fr =>
          fr.readAsDataURL(blob)
        )) as string;
        const image = await loadImage(dataUrl);
        image.id = name;
        return image;
      })
    );
    set(imagesAtom, images);
  }
);
