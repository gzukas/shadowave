import { client } from '@/utils/client';
import { readFile } from '@/utils/readFile';
import { loadImage } from '@/utils/loadImage';
import { imagesAtom } from '@/atoms/imagesAtom';
import { atomWithExpiringWriteState } from '@/utils/atomWithExpiringWriteState';
import { ImageSource } from '@/types';
import { atom } from 'jotai';

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
    const blobsByName = await Promise.all(
      imageSources.flatMap<Promise<Array<[string, Blob]>>>(async source => {
        if (source instanceof File) {
          return [[source.name, source]];
        }
        if (typeof source === 'string') {
          const blob = await (await fetch(source, { signal })).blob();
          return [[source, blob]];
        }
        const { data } = await client
          .screenshots({
            url: encodeURIComponent(source.url)
          })
          .get({ query: source, fetch: { signal } });

        return Object.entries(data || {});
      })
    );
    const images = await Promise.all(
      blobsByName.flat().map(async ([name, blob]) => {
        const dataUrl = (await readFile(fr => fr.readAsDataURL(blob), {
          signal
        })) as string;
        const image = await loadImage(dataUrl);
        image.id = name;
        return image;
      })
    );
    set(imagesAtom, images);
  }
);
