type Executor<T> = ConstructorParameters<typeof Promise<T>>[0];

export interface CreateAbortablePromiseOptions {
  signal?: AbortSignal;
}

export function createAbortablePromise<T>(
  executor: Executor<T>,
  { signal }: CreateAbortablePromiseOptions = {}
) {
  return new Promise<T>((resolve, reject) => {
    signal?.addEventListener('abort', () => {
      reject(signal.reason);
    });
    executor(resolve, reject);
  });
}
