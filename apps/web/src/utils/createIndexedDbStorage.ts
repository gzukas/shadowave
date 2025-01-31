import { get, set, del, UseStore } from 'idb-keyval';
import { AsyncStorage } from 'jotai/vanilla/utils/atomWithStorage';

export function createIndexedDbStorage<Value>(
  store?: UseStore
): AsyncStorage<Value> {
  return {
    async getItem(key, initialValue) {
      return (await get(key, store)) ?? initialValue;
    },
    setItem: set,
    removeItem: del
  };
}
