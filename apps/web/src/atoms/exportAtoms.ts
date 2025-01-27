import { fileSave } from 'browser-fs-access';
import { atom } from 'jotai';
import { rasterize } from '@/utils/rasterize';
import { graphicsAtom } from '@/atoms/graphicsAtom';
import {
  DEFAULT_FILENAME,
} from '@/constants';
import { atomWithExpiringWriteState } from '@/utils/atomWithExpiringWriteState';

export type ExportFileHandle = Awaited<ReturnType<typeof fileSave>>;

// const exportingAtom = atomWithExpire<LoadableState | null>(null);
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

// export const exportAtom = atom(
//   get => get(exportingAtom),
//   async (
//     get,
//     set,
//     exportFileHandle: ExportFileHandle = get(exportFileHandleAtom)
//   ) => {
//     const graphics = get(graphicsAtom);
//     if (!graphics) {
//       return;
//     }
//     try {
//       set(exportingAtom, LOADABLE_STATE.LOADING);
//       set(
//         exportFileHandleAtom,
//         await fileSave(
//           rasterize(graphics),
//           {
//             fileName: DEFAULT_FILENAME,
//             extensions: ['.png']
//           },
//           exportFileHandle
//         )
//       );
//       set(exportingAtom, LOADABLE_STATE.HAS_DATA, DEFAULT_LOADABLE_STATE_TIMEOUT);
//     } catch (error) {
//       // Disregard errors if file saving is canceled.
//       set(
//         exportingAtom,
//         error instanceof DOMException ? null : LOADABLE_STATE.HAS_ERROR,
//         DEFAULT_LOADABLE_STATE_TIMEOUT
//       );
//     }
//   }
// );
