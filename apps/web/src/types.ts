import { deviceType, url } from '@workspace/schema';
import { LOADABLE_STATE } from '@/constants';

type ValueOf<T> = T[keyof T];

export type LoadableState = ValueOf<typeof LOADABLE_STATE>;

export type Site = {
  url: typeof url.static;
  deviceType: typeof deviceType.static;
};

export type ImageSource = Site | File | string;
