export const ANY_OTHER_KEY = 'any';

type OperatingSystemKeyDisplay = Record<string, string | undefined>;

export type KeyDisplayMapping = {
  macos: OperatingSystemKeyDisplay;
  other: OperatingSystemKeyDisplay;
};

export const defaultKeyDisplayMapping: KeyDisplayMapping = {
  macos: {
    ctrl: '⌃',
    alt: '⌥',
    shift: '⇧',
    mod: '⌘',
    meta: '⌘',
    [ANY_OTHER_KEY]: undefined,
    arrowup: '↑',
    arrowdown: '↓'
  },
  other: {
    ctrl: 'Ctrl',
    mod: 'Ctrl',
    alt: 'Alt',
    shift: '⇧',
    meta: 'Meta',
    [ANY_OTHER_KEY]: undefined,
    arrowup: '↑',
    arrowdown: '↓'
  }
};
