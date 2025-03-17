import { createAbortablePromise } from '@/utils/createAbortablePromise';

export interface ReadFileOptions {
  /**
   * Optional AbortSignal to allow cancellation of the file reading.
   */
  signal?: AbortSignal;
}

/**
 * Reads a file and returns a promise that resolves with the result.
 *
 * @param read - A function that invokes the appropriate `FileReader` method to read the file.
 * @param options - Optional parameters.
 */
export function readFile(
  read: (reader: FileReader) => void,
  options?: ReadFileOptions
): Promise<FileReader['result']> {
  return createAbortablePromise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result));
    reader.addEventListener('error', reject);
    read(reader);
  }, options);
}

/**
 * Reads the `file` as a base64-encoded data URL.
 *
 * @param file - The file to be read.
 * @param options - Optional parameters.
 */
export function readFileAsDataURL(file: Blob, options?: ReadFileOptions) {
  return readFile(
    reader => reader.readAsDataURL(file),
    options
  ) as Promise<string>;
}
