import { atomWithStorage } from 'jotai/utils';
import { WAVE_FUNCTION } from '@/constants';
import { WaveFunction } from '@/types';

export const waveFunctionAtom = atomWithStorage<WaveFunction>(
  'waveFunction',
  WAVE_FUNCTION.HEARTBEAT,
  undefined,
  { getOnInit: true }
);
