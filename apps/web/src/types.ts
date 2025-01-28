import { deviceType, url } from '@workspace/schema';
import { LOADABLE_STATE, WAVE_FUNCTION } from '@/constants';

type ValueOf<T> = T[keyof T];

export type LoadableState = ValueOf<typeof LOADABLE_STATE>;

export type WaveFunction = ValueOf<typeof WAVE_FUNCTION>;

export type Site = {
  url: typeof url.static;
  deviceType: typeof deviceType.static;
};

export type ImageSource = Site | File | string;
