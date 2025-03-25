type Executor<T> = ConstructorParameters<typeof Promise<T>>[0];

export interface CreateAbortablePromiseOptions {
  /**
   * An `AbortSignal` that can be used to abort the promise.
   */
  signal?: AbortSignal;
}

/**
 * Creates a promise that can be aborted using an `AbortSignal`.
 *
 * @param executor - The executor function (same as for a standard `Promise` constructor)/
 * @param param1 - Optional parameters.
 */
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
