import { DEFAULT_LOADABLE_STATE_TIMEOUT, LOADABLE_STATE } from '@/constants';
import { atom, Getter, Setter } from 'jotai';
import { atomWithExpire } from './atomWithExpire';
import { LoadableState } from '@/types';

export interface AtomWithExpiringWriteStateOptions {
  /**
   * Time in milliseconds before the state expires. Defaults to `DEFAULT_LOADABLE_STATE_TIMEOUT`.
   */
  expireInMs?: number;

  /**
   * Determines if an `error` should be ignored.
   *
   * If `true` is returned, the error state will be set to `null` instead of `LOADABLE_STATE.HAS_ERROR`.
   */
  shouldIgnoreError?: (error: unknown) => boolean;
}

/**
 * Creates a Jotai atom that handles async write operations with an expiring state.
 *
 * This function wraps an asynchronous write operation with a Jotai atom that tracks the loadable state
 * (`LOADING`, `HAS_DATA`, `HAS_ERROR`, or `null`). The state expires after a specified timeout.
 *
 * Use this to provide users with immediate, short-lived feedback, like success or error elements,
 * after they perform an action.
 *
 * @example
 * ```
 * const fetchDataAtom = atomWithExpiringWriteState(async (get, set, url: string) => {
 *   const response = await fetch(url);
 *   return response.json();
 * });
 *
 * // Usage
 * const [state, fetchData] = useAtom(fetchDataAtom);
 * if (state === LOADABLE_STATE.LOADING) {
 *   // Show loading indicator
 * } else if (state === LOADABLE_STATE.HAS_ERROR) {
 *   // Show error
 * } else {
 *   // Show data
 * }
 * ```
 *
 * @param write - The asynchronous write function that performs the operation.
 * @param options - Options for configuring the atom's behavior.
 */
export function atomWithExpiringWriteState<Args extends unknown[], Result>(
  write: (get: Getter, set: Setter, ...args: Args) => Result,
  options: AtomWithExpiringWriteStateOptions = {}
) {
  const { expireInMs = DEFAULT_LOADABLE_STATE_TIMEOUT, shouldIgnoreError } =
    options;
  const writeStateAtom = atomWithExpire<LoadableState | null>(null);
  return atom(
    get => get(writeStateAtom),
    async (get, set, ...args: Args) => {
      set(writeStateAtom, LOADABLE_STATE.LOADING);
      try {
        const result = await write(get, set, ...args);
        set(writeStateAtom, LOADABLE_STATE.HAS_DATA, expireInMs);
        return result;
      } catch (error) {
        const errorState = shouldIgnoreError?.(error)
          ? null
          : LOADABLE_STATE.HAS_ERROR;
        set(writeStateAtom, errorState, expireInMs);
        if (errorState) {
          throw error;
        }
      }
    }
  );
}
