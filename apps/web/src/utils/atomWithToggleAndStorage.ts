import { WritableAtom, atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

/**
 * Creates a Jotai atom with storage and toggle functionality.
 *
 * This function combines `atomWithStorage` for persistent storage with a custom
 * writable atom that toggles the stored boolean value when updated without a
 * specific value.
 *
 * @param args - Arguments passed to to `atomWithStorage`.
 */
export function atomWithToggleAndStorage(
  ...args: Parameters<typeof atomWithStorage<boolean>>
): WritableAtom<boolean, [boolean?], void> {
  const anAtom = atomWithStorage(...args);
  const derivedAtom = atom(
    get => get(anAtom),
    (get, set, nextValue?: boolean) => {
      set(anAtom, nextValue ?? !get(anAtom));
    }
  );

  return derivedAtom;
}
