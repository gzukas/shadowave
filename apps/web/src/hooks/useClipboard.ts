import { useCallback } from 'react';
import { LoadableState } from '@/types';
import { DEFAULT_LOADABLE_STATE_TIMEOUT, LOADABLE_STATE } from '@/constants';
import { useExpireAtom } from '@/hooks/useExpireAtom';

type Copy = (
  ...args: ConstructorParameters<typeof ClipboardItem>
) => Promise<void>;

export const isClipboardSupported =
  navigator.clipboard && typeof window.ClipboardItem === 'function';

export interface UseClipboardResult {
  /**
   * A function to copy the provided data to the clipboard.
   */
  copy: Copy;

  /**
   * The current state of the clipboard operation, which resets to null after a timeout.
   * Defaults to {@link DEFAULT_LOADABLE_STATE_TIMEOUT}.
   */
  state: LoadableState;
}

export interface UseClipboardOptions {
  /**
   * Timeout in milliseconds for the state reset after a successful or failed copy operation.
   */
  timeout?: number;
}

/**
 * A hook to interact with the clipboard API.
 *
 * Provides a function to copy data to the clipboard and tracks the state of the operation.
 *
 * @param options - Options of a copy operation.
 */
export function useClipboard(options: UseClipboardOptions = {}) {
  const { timeout = DEFAULT_LOADABLE_STATE_TIMEOUT } = options;
  const [state, setState] = useExpireAtom<LoadableState | null>(null);
  const copy = useCallback<Copy>(
    async (...args) => {
      setState(LOADABLE_STATE.LOADING);
      try {
        if (!isClipboardSupported) {
          throw new Error(
            'useClipboard: the ClipboardItem API is not supported'
          );
        }
        await navigator.clipboard.write([new window.ClipboardItem(...args)]);
        setState(LOADABLE_STATE.HAS_DATA, timeout);
      } catch (_error) {
        setState(LOADABLE_STATE.HAS_ERROR, timeout);
      }
    },
    [setState, timeout]
  );
  return { copy, state };
}
