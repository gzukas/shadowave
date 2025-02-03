import { WAVE_FUNCTION } from '@/constants';
import { WaveFunction } from '@/types';
import { atomWithReset } from 'jotai/utils';

export const waveFunctionAtom = atomWithReset<WaveFunction>(WAVE_FUNCTION.SIN);
