export const MIME_TYPES = {
  svg: 'image/svg+xml',
  png: 'image/png'
} as const;

export const LOADABLE_STATE = {
  LOADING: 'loading',
  HAS_DATA: 'hasData',
  HAS_ERROR: 'hasError'
} as const;

export const WAVE_FUNCTION = {
  SIN: 'sin',
  COS: 'cos'
} as const;

export const HOTKEYS = {
  IMPORT: 'mod+O',
  SAVE: 'mod+S',
  SAVE_AS: 'mod+shift+S',
  COPY: 'mod+C',
  ROTATION_UP: '1+ArrowUp',
  ROTATION_DOWN: '1+ArrowDown',
  WAVELENGTH_UP: '2+ArrowUp',
  WAVELENGTH_DOWN: '2+ArrowDown',
  AMPLITUDE_UP: '3+ArrowUp',
  AMPLITUDE_DOWN: '3+ArrowDown'
} as const;

export const DEFAULT_LOADABLE_STATE_TIMEOUT = 1000;

export const DEFAULT_FILENAME = 'shadowave';
