import { Getter } from 'jotai';

type NumberOrGetter =
  | number
  | undefined
  | ((get: Getter) => number | undefined);

function read(get: Getter, value?: NumberOrGetter) {
  return typeof value === 'number' ? value : value?.(get);
}

export type CountAction =
  | { type: 'CHANGE'; value: number }
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' };

export interface CreateCountReducerOptions {
  min?: NumberOrGetter;
  max?: NumberOrGetter;
  step?: NumberOrGetter;
}

export function createCountReducer({
  min,
  max,
  step
}: CreateCountReducerOptions = {}) {
  return (get: Getter, prev: number, action: CountAction) => {
    switch (action.type) {
      case 'CHANGE': {
        return action.value;
      }
      case 'INCREMENT': {
        return Math.min(
          read(get, max) ?? Infinity,
          prev + (read(get, step) ?? 1)
        );
      }
      case 'DECREMENT': {
        return Math.max(
          read(get, min) ?? -Infinity,
          prev - (read(get, step) ?? 1)
        );
      }
    }
  };
}
