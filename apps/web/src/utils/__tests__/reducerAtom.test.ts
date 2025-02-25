import { atom, useAtom, Getter, PrimitiveAtom, WritableAtom } from 'jotai';
import { renderHook, act } from '@testing-library/react';
import { reducerAtom } from '@/utils/reducerAtom';

type CounterAction = { type: 'increment' } | { type: 'decrement' };

describe('reducerAtom', () => {
  const counterReducer = (
    _get: Getter,
    value: number,
    action: CounterAction
  ) => {
    switch (action.type) {
      case 'increment':
        return value + 1;
      case 'decrement':
        return value - 1;
    }
  };

  let baseAtom: PrimitiveAtom<number>;
  let counterAtom: WritableAtom<number, [CounterAction], void>;

  beforeEach(() => {
    baseAtom = atom(0);
    counterAtom = reducerAtom(baseAtom, counterReducer);
  });

  it('creates an atom with initial value from baseAtom', () => {
    const { result } = renderHook(() => useAtom(counterAtom));
    expect(result.current[0]).toBe(0);
  });

  it('updates value using reducer when dispatched', () => {
    const { result } = renderHook(() => useAtom(counterAtom));
    act(() => {
      result.current[1]({ type: 'increment' });
    });
    expect(result.current[0]).toBe(1);
  });

  it('maintains state across multiple dispatches', () => {
    const { result } = renderHook(() => useAtom(counterAtom));

    act(() => {
      const [, dispatch] = result.current;
      dispatch({ type: 'increment' });
      dispatch({ type: 'increment' });
      dispatch({ type: 'decrement' });
    });

    expect(result.current[0]).toBe(1);
  });

  it('works with atoms in reducer', () => {
    const stepAtom = atom(2);
    const baseAtom = atom(0);

    const dependentReducer = (
      get: Getter,
      value: number,
      action: CounterAction
    ) => {
      const step = get(stepAtom);
      switch (action.type) {
        case 'increment':
          return value + step;
        case 'decrement':
          return value - step;
      }
    };

    const counterAtom = reducerAtom(baseAtom, dependentReducer);
    const { result } = renderHook(() => useAtom(counterAtom));

    act(() => {
      const [, dispatch] = result.current;
      dispatch({ type: 'increment' });
      dispatch({ type: 'increment' });
      dispatch({ type: 'decrement' });
    });

    expect(result.current[0]).toBe(2);
  });

  it('preserves base atom writability', () => {
    const { result: counterResult } = renderHook(() => useAtom(counterAtom));
    const { result: baseResult } = renderHook(() => useAtom(baseAtom));

    act(() => {
      counterResult.current[1]({ type: 'increment' });
    });

    expect(counterResult.current[0]).toBe(1);
    expect(baseResult.current[0]).toBe(1);
  });
});
