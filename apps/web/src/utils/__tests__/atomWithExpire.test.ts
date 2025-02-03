import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getDefaultStore } from 'jotai';
import { atomWithExpire } from '@/utils/atomWithExpire';

vi.useFakeTimers();

describe('atomWithExpire', () => {
  let store: ReturnType<typeof getDefaultStore>;

  beforeEach(() => {
    store = getDefaultStore();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it('should initialize with the given value', () => {
    const atom = atomWithExpire(0);
    expect(store.get(atom)).toBe(0);
  });

  it('should update the value and set a timeout to reset it', () => {
    const expireInMs = 1000;
    const atom = atomWithExpire(0);

    store.set(atom, 42, expireInMs);
    expect(store.get(atom)).toBe(42);

    vi.advanceTimersByTime(expireInMs);
    expect(store.get(atom)).toBe(0);
  });

  it('should clear previous timeout if a new value is set before expiration', () => {
    const newValue = 42;
    const anotherNewValue = newValue * 2;
    const expireInMs = 1000;
    const atom = atomWithExpire(0);

    store.set(atom, newValue, expireInMs);
    vi.advanceTimersByTime(expireInMs / 2);

    store.set(atom, anotherNewValue, expireInMs);
    expect(store.get(atom)).toBe(anotherNewValue);

    vi.advanceTimersByTime(expireInMs / 2);
    expect(store.get(atom)).toBe(anotherNewValue);

    vi.advanceTimersByTime(expireInMs / 2);
    expect(store.get(atom)).toBe(0);
  });
});
