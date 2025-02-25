import { createCountReducer } from '@/utils/createCountReducer';

describe('createCountReducer', () => {
  const mockGet = vi.fn();

  beforeEach(() => {
    mockGet.mockClear();
  });

  it('handles CHANGE action', () => {
    const reducer = createCountReducer();
    const result = reducer(mockGet, 5, { type: 'CHANGE', value: 10 });
    expect(result).toBe(10);
  });

  it('handles INCREMENT action with default step', () => {
    const reducer = createCountReducer();
    const result = reducer(mockGet, 5, { type: 'INCREMENT' });
    expect(result).toBe(6);
  });

  it('handles INCREMENT action with custom step', () => {
    const reducer = createCountReducer({ step: 3 });
    const result = reducer(mockGet, 5, { type: 'INCREMENT' });
    expect(result).toBe(8);
  });

  it('handles DECREMENT action with default step', () => {
    const reducer = createCountReducer();
    const result = reducer(mockGet, 5, { type: 'DECREMENT' });
    expect(result).toBe(4);
  });

  it('handles DECREMENT action with custom step', () => {
    const reducer = createCountReducer({ step: 3 });
    const result = reducer(mockGet, 5, { type: 'DECREMENT' });
    expect(result).toBe(2);
  });

  it('respects min boundary on INCREMENT', () => {
    const reducer = createCountReducer({ min: 0 });
    let result = reducer(vi.fn(), 1, { type: 'DECREMENT' });
    result = reducer(vi.fn(), result, { type: 'DECREMENT' });
    expect(result).toBe(0);
  });

  it('respects max boundary on INCREMENT', () => {
    const reducer = createCountReducer({ max: 10 });
    let result = reducer(mockGet, 9, { type: 'INCREMENT' });
    result = reducer(mockGet, result, { type: 'INCREMENT' });
    expect(result).toBe(10);
  });

  it('handles min as getter function', () => {
    const minGetter = vi.fn(() => 0);
    const reducer = createCountReducer({ min: minGetter });
    const result = reducer(mockGet, 1, { type: 'DECREMENT' });
    expect(result).toBe(0);
    expect(minGetter).toHaveBeenCalledWith(mockGet);
  });

  it('handles max as getter function', () => {
    const max = vi.fn(() => 10);
    const reducer = createCountReducer({ max });
    const result = reducer(mockGet, 10, { type: 'INCREMENT' });
    expect(result).toBe(10);
    expect(max).toHaveBeenCalledWith(mockGet);
  });

  it('handles step as getter function', () => {
    const step = vi.fn(() => 3);
    const reducer = createCountReducer({ step: step });
    const result = reducer(mockGet, 5, { type: 'INCREMENT' });
    expect(result).toBe(8);
    expect(step).toHaveBeenCalledWith(mockGet);
  });
});
