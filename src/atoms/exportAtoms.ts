import { atom } from 'jotai';
import { graphicsAtom } from './graphicsAtom';
import { fileSave } from 'browser-fs-access';
import { rasterize } from '@/utils/rasterize';

const exportingAtom = atom(false);

export const exportFileHandleAtom =
  atom<Awaited<ReturnType<typeof fileSave>>>(null);

export const exportAtom = atom(
  get => get(exportingAtom),
  async (get, set) => {
    const graphics = get(graphicsAtom);
    if (!graphics) {
      return;
    }
    set(exportingAtom, true);
    try {
      set(
        exportFileHandleAtom,
        await fileSave(rasterize(graphics), {
          fileName: 'shadowave.png',
          startIn: 'downloads',
          extensions: ['.png']
        })
      );
    } catch (error) {
      // Disregard errors if file saving is canceled.
      if (!(error instanceof DOMException)) {
        throw error;
      }
    } finally {
      set(exportingAtom, false);
    }
  }
);
