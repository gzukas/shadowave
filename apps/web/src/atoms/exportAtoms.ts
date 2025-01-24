import { fileSave } from 'browser-fs-access';
import { atom } from 'jotai';
import { rasterize } from '@/utils/rasterize';
import { atomWithExpire } from '@/utils/atomWithExpire';
import { graphicsAtom } from '@/atoms/graphicsAtom';
import { LoadableState } from '@/types';
import {
  DEFAULT_FILENAME,
  DEFAULT_LOADABLE_STATE_TIMEOUT,
  LOADABLE_STATE
} from '@/constants';

export type ExportFileHandle = Awaited<ReturnType<typeof fileSave>>;

const exportingAtom = atomWithExpire<LoadableState | null>(null);
export const exportFileHandleAtom = atom<ExportFileHandle>(null);

export const exportAtom = atom(
  get => get(exportingAtom),
  async (
    get,
    set,
    exportFileHandle: ExportFileHandle = get(exportFileHandleAtom)
  ) => {
    const graphics = get(graphicsAtom);
    if (!graphics) {
      return;
    }
    try {
      set(exportingAtom, LOADABLE_STATE.LOADING);
      set(
        exportFileHandleAtom,
        await fileSave(
          rasterize(graphics),
          {
            fileName: DEFAULT_FILENAME,
            extensions: ['.png']
          },
          exportFileHandle
        )
      );
      set(exportingAtom, LOADABLE_STATE.HAS_DATA, DEFAULT_LOADABLE_STATE_TIMEOUT);
    } catch (error) {
      // Disregard errors if file saving is canceled.
      set(
        exportingAtom,
        error instanceof DOMException ? null : LOADABLE_STATE.HAS_ERROR,
        DEFAULT_LOADABLE_STATE_TIMEOUT
      );
    }
  }
);
