import { useCallback } from 'react';
import { useSetAtom } from 'jotai';
import { fileOpen } from 'browser-fs-access';
import { imagesAtom } from '@/atoms/imagesAtom';

export function useImagesDisclosure() {
  const setImages = useSetAtom(imagesAtom);

  const open = useCallback(async () => {
    try {
      setImages(
        await fileOpen({
          mimeTypes: ['image/*'],
          multiple: true
        })
      );
    } catch (error) {
      // Disregard errors if file opening is canceled.
      if (!(error instanceof DOMException)) {
        throw error;
      }
    }
  }, [setImages]);

  const close = useCallback(() => {
    setImages([]);
  }, [setImages]);

  return [open, close];
}
