import { useCallback } from 'react';
import { useExpireAtom } from './useExpireAtom';

export const isClipboardSupported =
  navigator.clipboard && typeof window.ClipboardItem === 'function';

export type CopyState = 'copying' | 'copied' | 'error';

export interface UseClipboardResult {
  copy: (...args: ConstructorParameters<typeof ClipboardItem>) => Promise<void>;
  state: 'copying' | 'copied' | 'error';
}

export interface UseClipboardOptions {
  timeout?: number;
}

export function useClipboard(options: UseClipboardOptions = {}) {
  const { timeout = 1000 } = options;
  const [state, setState] = useExpireAtom<CopyState | undefined>(undefined);
  const copy = useCallback<UseClipboardResult['copy']>(async (...args) => {
    setState('copying');
    try {
      if (!isClipboardSupported) {
        throw new Error('useClipboard: the ClipboardItem API is not supported');
      }
      await navigator.clipboard.write([new window.ClipboardItem(...args)]);
      setState('copied', timeout);
    } catch (error) {
      setState('error', timeout);
    }
  }, []);
  return { copy, state };
}
