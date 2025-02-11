import { WritableAtom, atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export function atomWithToggleAndStorage(
  ...args: Parameters<typeof atomWithStorage<boolean>>
): WritableAtom<boolean, [boolean?], void> {
  const anAtom = atomWithStorage(...args);
  const derivedAtom = atom(
    get => get(anAtom),
    (get, set, nextValue?: boolean) => {
      const update = nextValue ?? !get(anAtom);
      void set(anAtom, update);
    }
  );

  return derivedAtom as WritableAtom<boolean, [boolean?], void>;
}
