import { atom, Getter, WritableAtom } from 'jotai';
import { SetStateAction } from 'react';

export function reducerAtom<Value, Action>(
  baseAtom: WritableAtom<Value, [SetStateAction<Value>], void>,
  reducer: (get: Getter, value: Value, action: Action) => Value
) {
  return atom(
    get => get(baseAtom),
    (get, set, action: Action) => {
      set(baseAtom, value => reducer(get, value, action));
    }
  );
}
