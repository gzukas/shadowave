import { vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useClipboard } from '@/hooks/useClipboard';
import { DEFAULT_LOADABLE_STATE_TIMEOUT, LOADABLE_STATE } from '@/constants';

vi.useFakeTimers();

describe('useClipboard hook', () => {
  it('should copy to clipboard successfully', async () => {
    const { result } = renderHook(() => useClipboard());

    await act(async () => {
      await result.current.copy({
        'text/plain': 'Data'
      });
    });

    expect(result.current.state).toBe(LOADABLE_STATE.LOADED);
    await expect(navigator.clipboard.readText()).resolves.toBe('Data');

    act(() => {
      vi.advanceTimersByTime(DEFAULT_LOADABLE_STATE_TIMEOUT);
    });

    expect(result.current.state).toBeNull();
  });

  it('should handle a clipboard rejection', async () => {
    vi.spyOn(navigator.clipboard, 'write').mockRejectedValue(
      new Error('NotAllowedError')
    );

    const { result } = renderHook(() => useClipboard());

    await act(async () => {
      await result.current.copy({});
    });

    expect(result.current.state).toBe(LOADABLE_STATE.ERROR);

    act(() => {
      vi.advanceTimersByTime(DEFAULT_LOADABLE_STATE_TIMEOUT);
    });

    expect(result.current.state).toBeNull();
  });
});
