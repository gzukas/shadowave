import { atom } from 'jotai';
import { graphicsAtom } from './graphicsAtom';
import { loadImage } from '@/utils/loadImage';
import { fileSave } from 'browser-fs-access';

export const exportingAtom = atom(false);
const fileHandleAtom = atom<Awaited<ReturnType<typeof fileSave>>>(null);

export const exportAtom = atom(null, async (get, set) => {
  const graphics = get(graphicsAtom);
  if (!graphics) {
    return;
  }

  set(exportingAtom, true);

  try {
    const svgString = new XMLSerializer().serializeToString(graphics);
    const image = await loadImage(
      `data:image/svg+xml;base64,${btoa(svgString)}`
    );
    const blobPromise = new Promise<Blob>((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      const { width, height } = graphics.getBBox();

      canvas.width = width;
      canvas.height = height;

      context!.drawImage(image, 0, 0, width, height);
      canvas.toBlob(blob => {
        if (blob) {
          resolve(blob);
        } else {
          reject();
        }
      }, 'image/png');
    });
    set(
      fileHandleAtom,
      await fileSave(blobPromise, {
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
});
