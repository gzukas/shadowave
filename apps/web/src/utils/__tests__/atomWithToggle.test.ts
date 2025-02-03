import { describe, it, expect } from 'vitest';
import { getDefaultStore } from 'jotai';
import { atomWithToggle } from '@/utils/atomWithToggle';

describe('atomWithToggle', () => {
  let store: ReturnType<typeof getDefaultStore>;

  beforeEach(() => {
    store = getDefaultStore();
  });

  it('should initialize with the given value', () => {
    const atom = atomWithToggle(true);
    expect(store.get(atom)).toBe(true);
  });

  it('should toggle the value when no argument is provided', () => {
    const atom = atomWithToggle(false);

    store.set(atom);
    expect(store.get(atom)).toBe(true);

    store.set(atom);
    expect(store.get(atom)).toBe(false);
  });

  it('should set the value to the provided argument', () => {
    const atom = atomWithToggle(true);

    store.set(atom, false);
    expect(store.get(atom)).toBe(false);

    store.set(atom, true);
    expect(store.get(atom)).toBe(true);
  });

  it('should toggle the value correctly from the initial undefined state', () => {
    const atom = atomWithToggle();
    expect(store.get(atom)).toBe(undefined);

    store.set(atom);
    expect(store.get(atom)).toBe(true);

    store.set(atom);
    expect(store.get(atom)).toBe(false);
  });
});
