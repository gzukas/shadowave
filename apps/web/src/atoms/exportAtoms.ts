import { atom } from 'jotai';
import { fileSave } from 'browser-fs-access';
import { rasterize } from '@/utils/rasterize';
import { graphicsAtom } from '@/atoms/graphicsAtom';
import { atomWithExpiringWriteState } from '@/utils/atomWithExpiringWriteState';
import { DEFAULT_FILENAME } from '@/constants';

export type ExportFileHandle = Awaited<ReturnType<typeof fileSave>>;

export const exportFileHandleAtom = atom<ExportFileHandle>(null);

export const exportAtom = atomWithExpiringWriteState(
  async (
    get,
    set,
    exportFileHandle: ExportFileHandle = get(exportFileHandleAtom)
  ) => {
    const graphics = get(graphicsAtom);
    if (!graphics) {
      return;
    }
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
  },
  { shouldIgnoreError: error => error instanceof DOMException }
);
