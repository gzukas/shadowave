import { act, renderHook } from '@testing-library/react';
import { useExpireAtom } from '../useExpireAtom';

describe('useExpireAtom', () => {
  it('should reset the atom value to initial value after the specified timeout', () => {
    vi.useFakeTimers();

    const { result } = renderHook(() => useExpireAtom<string | null>(null));
    const [, setState] = result.current;

    act(() => {
      setState('permanent');
      vi.advanceTimersByTime(5000);
    });

    expect(result.current[0]).toBe('permanent');

    act(() => {
      setState('temp', 500);
    });

    expect(result.current[0]).toBe('temp');

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current[0]).toBe(null);
  });
});
