import { createAbortablePromise } from '@/utils/createAbortablePromise';

export interface ReadFileOptions {
  signal?: AbortSignal;
}

export function readFile(
  read: (reader: FileReader) => void,
  options?: ReadFileOptions
): Promise<FileReader['result'] | undefined> {
  return createAbortablePromise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('load', e => resolve(e.target?.result));
    reader.addEventListener('error', reject);
    read(reader);
  }, options);
}
