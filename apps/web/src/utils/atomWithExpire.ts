import { atom } from 'jotai';
import { RESET, atomWithReset } from 'jotai/utils';

/**
 * Creates a Jotai atom that expires after a specified time.
 *
 * This function creates an atom that holds a value and automatically resets
 * to its initial value after the given timeout. The timeout can be provided
 * with each write operation. If no timeout is provided, the atom behaves like
 * a regular `atomWithReset`.
 *
 * @param initialValue - The initial value of the atom.
 */
export function atomWithExpire<T>(initialValue: T) {
  const timeoutAtom = atom<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );
  const valueAtom = atomWithReset(initialValue);
  return atom(
    get => get(valueAtom),
    (get, set, value: T, expireInMs?: number) => {
      clearTimeout(get(timeoutAtom));
      set(valueAtom, value);
      if (expireInMs) {
        set(
          timeoutAtom,
          setTimeout(() => {
            set(valueAtom, RESET);
          }, expireInMs)
        );
      }
    }
  );
}
