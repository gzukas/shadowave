export const MIME_TYPES = {
  svg: 'image/svg+xml',
  png: 'image/png'
} as const;

export const LOADABLE_STATE = {
  LOADING: 'loading',
  LOADED: 'loaded',
  ERROR: 'error'
} as const;

export const DEFAULT_LOADABLE_STATE_TIMEOUT = 1000;

export const DEFAULT_FILENAME = 'shadowave';
