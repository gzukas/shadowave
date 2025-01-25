import { createAbortablePromise } from '@/utils/createAbortablePromise';

export interface LoadImageOptions {
  signal?: AbortSignal;
}

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
