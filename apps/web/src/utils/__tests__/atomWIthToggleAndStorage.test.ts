import { describe, it, expect } from 'vitest';
import { getDefaultStore } from 'jotai';
import { atomWithToggleAndStorage } from '@/utils/atomWithToggleAndStorage';

describe('atomWithToggleAndStorage', () => {
  let store: ReturnType<typeof getDefaultStore>;

  beforeEach(() => {
    store = getDefaultStore();
  });

  it('should initialize with the given value', () => {
    const atom = atomWithToggleAndStorage('value', true);
    expect(store.get(atom)).toBe(true);
  });

  it('should toggle the value when no argument is provided', () => {
    const atom = atomWithToggleAndStorage('value', false);

    store.set(atom);
    expect(store.get(atom)).toBe(true);

    store.set(atom);
    expect(store.get(atom)).toBe(false);
  });

  it('should set the value to the provided argument', () => {
    const atom = atomWithToggleAndStorage('value', true);

    store.set(atom, false);
    expect(store.get(atom)).toBe(false);

    store.set(atom, true);
    expect(store.get(atom)).toBe(true);
  });
});
