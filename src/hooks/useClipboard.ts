import { useCallback } from 'react';
import { LoadableState } from '@/types';
import { DEFAULT_LOADABLE_STATE_TIMEOUT, LOADABLE_STATE } from '@/constants';
import { useExpireAtom } from './useExpireAtom';

export const isClipboardSupported =
  navigator.clipboard && typeof window.ClipboardItem === 'function';

export interface UseClipboardResult {
  copy: (...args: ConstructorParameters<typeof ClipboardItem>) => Promise<void>;
  state: LoadableState;
}

export interface UseClipboardOptions {
  timeout?: number;
}

export function useClipboard(options: UseClipboardOptions = {}) {
  const { timeout = DEFAULT_LOADABLE_STATE_TIMEOUT } = options;
  const [state, setState] = useExpireAtom<LoadableState | null>(null);
  const copy = useCallback<UseClipboardResult['copy']>(
    async (...args) => {
      setState(LOADABLE_STATE.LOADING);
      try {
        if (!isClipboardSupported) {
          throw new Error(
            'useClipboard: the ClipboardItem API is not supported'
          );
        }
        await navigator.clipboard.write([new window.ClipboardItem(...args)]);
        setState(LOADABLE_STATE.LOADED, timeout);
      } catch (error) {
        setState(LOADABLE_STATE.ERROR, timeout);
      }
    },
    [setState, timeout]
  );
  return { copy, state };
}
