import { atom } from 'jotai';
import { client } from '@/utils/client';
import { readFile } from '@/utils/readFile';
import { loadImage } from '@/utils/loadImage';
import { imagesAtom } from '@/atoms/imagesAtom';
import { atomWithExpiringWriteState } from '@/utils/atomWithExpiringWriteState';
import { ImageSource } from '@/types';

let imageId = 0;

const importAbortController = atom<AbortController | null>(null);

export const importSignalAtom = atom(
  get => get(importAbortController)?.signal,
  (get, set, refresh: boolean) => {
    get(importAbortController)?.abort();
    set(importAbortController, refresh ? new AbortController() : null);
  }
);

export const importAtom = atomWithExpiringWriteState(
  async (get, set, imageSources: ImageSource[]) => {
    const signal = get(importSignalAtom);
    const blobs = (
      await Promise.all(
        imageSources.map<Promise<Blob | Blob[]>>(async source => {
          if (source instanceof File) {
            return source;
          }
          if (typeof source === 'string') {
            return (await fetch(source, { signal })).blob();
          }
          const { url, deviceType } = source;
          const { data } = await client
            .screenshots({
              url: encodeURIComponent(url)
            })
            .get({ query: { deviceType }, fetch: { signal } });

          return Object.values(data || {});
        })
      )
    ).flat();

    const images = await Promise.all(
      blobs.map(async blob => {
        const dataUrl = (await readFile(fr => fr.readAsDataURL(blob), {
          signal
        })) as string;
        const image = await loadImage(dataUrl);
        image.id = `${imageId++}`;
        return image;
      })
    );
    set(imagesAtom, images);
  }
);
