import { atom } from 'jotai';
import { atomWithDefault } from 'jotai/utils';

export const defaultRotationAtom = atom(0);

export const rotationAtom = atomWithDefault(get => get(defaultRotationAtom));
