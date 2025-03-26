import { createAbortablePromise } from '@/utils/createAbortablePromise';

export interface LoadImageOptions {
  /**
   * Optional `AbortSignal` to allow cancellation of the image loading.
   */
  signal?: AbortSignal;
}

/**
 * Loads an image from given source URL.
 *
 * It creates an `HTMLImageElement` and sets its `src` attribute. It returns a promise
 * that resolves with the loaded image element when the image has successfully loaded,
 * or rejects with an error if the image fails to load or if the loading is aborted.
 *
 * @param src - The URL of the image to load.
 * @param options - Optional parameters.
 */
export function loadImage(
  src: string,
  options?: LoadImageOptions
): Promise<HTMLImageElement> {
  return createAbortablePromise((resolve, reject) => {
    const img = new Image();
    img.addEventListener('load', () => resolve(img));
    img.addEventListener('error', reject);
    img.src = src;
  }, options);
}
