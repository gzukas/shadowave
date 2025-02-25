import { createAbortablePromise } from '../createAbortablePromise';

describe('createAbortablePromise', () => {
  it('resolves normally without signal', async () => {
    const result = createAbortablePromise(resolve => resolve('success'));
    await expect(result).resolves.toBe('success');
  });

  it('rejects normally without signal', async () => {
    const result = createAbortablePromise((_, reject) => reject('error'));
    await expect(result).rejects.toThrow('error');
  });

  it('aborts when signal is aborted', async () => {
    vi.useFakeTimers();

    const controller = new AbortController();
    const promise = createAbortablePromise(
      resolve => setTimeout(() => resolve('too late'), 100),
      { signal: controller.signal }
    );
    vi.advanceTimersByTime(50);
    controller.abort('abort reason');

    await expect(promise).rejects.toBe('abort reason');
  });
});
