import { get, set, del, createStore } from 'idb-keyval';
import type { AsyncStorage } from 'jotai/vanilla/utils/atomWithStorage';

const idbKeyvalStore = createStore('keyval', 'keyval-store');

/**
 * Creates an async storage based on `idb-keyval` for use with Jotai's `atomWithStorage`.
 *
 * @template Value - The type of value stored in the storage.
 * @param store - The `idb-keyval` store to use.
 */
export function createIdbKeyvalStorage<Value>(
  store = idbKeyvalStore
): AsyncStorage<Value> {
  return {
    getItem: async (key, initialValue) =>
      (await get(key, store)) ?? initialValue,
    setItem: (key, value) => set(key, value, store),
    removeItem: key => del(key, store)
  };
}
