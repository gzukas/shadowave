import { atom } from 'jotai';
import { RESET, atomWithReset } from 'jotai/utils';

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
