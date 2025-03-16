import { atom } from 'jotai';
import { client } from '@/utils/client';
import { atomWithExpiringWriteState } from '@/utils/atomWithExpiringWriteState';
import { ImageSource } from '@/types';
import { ImageFile, imageFilesAtom } from './imagesAtom';

const importAbortControllerAtom = atom<AbortController | null>(null);

export const importSignalAtom = atom(
  get => get(importAbortControllerAtom)?.signal,
  (get, set, refresh?: boolean) => {
    get(importAbortControllerAtom)?.abort();
    set(importAbortControllerAtom, refresh ? new AbortController() : null);
  }
);

export const importAtom = atomWithExpiringWriteState(
  async (get, set, imageSource: ImageSource | ImageSource[]) => {
    const signal = get(importSignalAtom);
    const imageSources = Array.isArray(imageSource)
      ? imageSource
      : [imageSource];

    const imageFiles = (
      await Promise.all(
        imageSources.map<Promise<ImageFile[]>>(async source => {
          if (source instanceof File) {
            return [[source.name, source]];
          }
          if (typeof source === 'string') {
            const response = await fetch(source, { signal });
            return [[source, await response.blob()]];
          }
          const { url, deviceType } = source;
          const { data, error } = await client
            .screenshots({
              url: encodeURIComponent(url)
            })
            .get({ query: { deviceType }, fetch: { signal } });

          if (error) {
            throw error.value;
          }

          return Object.entries(data);
        })
      )
    ).flat();

    set(imageFilesAtom, imageFiles);
  }
);
