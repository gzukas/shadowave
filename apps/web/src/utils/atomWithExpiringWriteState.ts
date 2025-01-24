import { DEFAULT_LOADABLE_STATE_TIMEOUT, LOADABLE_STATE } from '@/constants';
import { atom, Getter, Setter } from 'jotai';
import { atomWithExpire } from './atomWithExpire';
import { LoadableState } from '@/types';

export interface AtomWithExpiringWriteStateOptions {
  shouldIgnoreError?: (error: unknown) => boolean;
}

export function atomWithExpiringWriteState<Args extends unknown[], Result>(
  write: (get: Getter, set: Setter, ...args: Args) => Result,
  expireInMs = DEFAULT_LOADABLE_STATE_TIMEOUT,
  options?: AtomWithExpiringWriteStateOptions
) {
  const writeStateAtom = atomWithExpire<LoadableState | null>(null);
  return atom(
    get => get(writeStateAtom),
    async (get, set, ...args: Args) => {
      set(writeStateAtom, LOADABLE_STATE.LOADING);
      try {
        await write(get, set, ...args);
        set(writeStateAtom, LOADABLE_STATE.HAS_DATA, expireInMs);
      } catch (error) {
        set(
          writeStateAtom,
          options?.shouldIgnoreError?.(error) ? null : LOADABLE_STATE.HAS_ERROR,
          expireInMs
        );
      }
    }
  );
}
