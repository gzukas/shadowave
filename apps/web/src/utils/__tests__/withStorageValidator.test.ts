import type { SyncStorage } from 'jotai/vanilla/utils/atomWithStorage';
import { Type } from '@sinclair/typebox';
import { withStorageValidator } from '@/utils/withStorageValidator';

describe('withStorageValidator', () => {
  const store = new Map<string, unknown>();
  const storage: SyncStorage<unknown> = {
    getItem: (key, initialValue) => store.get(key) ?? initialValue,
    setItem: (key, value) => store.set(key, value),
    removeItem: key => store.delete(key)
  };

  beforeEach(() => {
    store.clear();
  });

  it('should store and retrieve valid data', () => {
    const validatedStorage = withStorageValidator(Type.Number())(storage);
    validatedStorage.setItem('a', 1);
    expect(validatedStorage.getItem('a', 2)).toBe(1);
  });

  it('should return initial value when invalid data is retrieved', () => {
    const validatedStorage = withStorageValidator(Type.Number())(storage);
    storage.setItem('a', 'one');
    expect(validatedStorage.getItem('a', 1)).toBe(1);
  });

  it('should handle object schemas', () => {
    const validatedStorage = withStorageValidator(
      Type.Union([
        Type.Object({
          name: Type.String()
        }),
        Type.Null()
      ])
    )(storage);

    validatedStorage.setItem('john', { name: 'John' });
    expect(validatedStorage.getItem('john', null)).toEqual(store.get('john'));

    storage.setItem('jane', { name: false });
    expect(validatedStorage.getItem('jane', { name: 'Jane' })).toEqual({
      name: 'Jane'
    });
  });
});
