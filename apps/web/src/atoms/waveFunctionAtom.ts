import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import { Type } from '@sinclair/typebox';
import { withStorageValidator } from '@/utils/withStorageValidator';
import { WAVE_FUNCTION } from '@/constants';
import { WaveFunction } from '@/types';

const WaveFunctionSchema = Type.Union(
  Object.values(WAVE_FUNCTION).map(value => Type.Literal(value))
);

export const waveFunctionAtom = atomWithStorage<WaveFunction>(
  'waveFunction',
  WAVE_FUNCTION.HEARTBEAT,
  withStorageValidator(WaveFunctionSchema)(createJSONStorage()),
  { getOnInit: true }
);
