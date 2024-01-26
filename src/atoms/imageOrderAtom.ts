import { atom } from 'jotai';

export const imageOrderAtom = atom<'asc' | 'desc'>('asc');