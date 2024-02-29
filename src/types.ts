import { LOADABLE_STATE } from './constants';

type ValueOf<T> = T[keyof T];

export type LoadableState = ValueOf<typeof LOADABLE_STATE>;
