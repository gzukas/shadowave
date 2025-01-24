import { atomWithReset } from 'jotai/utils';

export const imagesAtom = atomWithReset<HTMLImageElement[]>([]);
