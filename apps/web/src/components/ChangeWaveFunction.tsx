import { useAtom, useAtomValue } from 'jotai';
import { waveFunctionAtom } from '@/atoms/waveFunctionAtom';
import {
  ToggleGroup,
  ToggleGroupItem
} from '@workspace/ui/components/toggle-group';
import { Sin } from '@/components/Sin';
import { Cos } from '@/components/Cos';
import { WAVE_FUNCTION } from '@/constants';
import { WaveFunction } from '@/types';
import { unwrappedImagesAtom } from '@/atoms/imagesAtom';

export type ChanveWaveFunctionProps = Omit<
  React.ComponentProps<typeof ToggleGroup>,
  | 'type'
  | 'value'
  | 'defaultValue'
  | 'waveFunction'
  | 'onValueChange'
  | 'disabled'
>;

export function ChangeWaveFunction(props: ChanveWaveFunctionProps) {
  const images = useAtomValue(unwrappedImagesAtom);
  const [waveFunction, setWaveFunction] = useAtom(waveFunctionAtom);

  const handleWaveFunctionChange = (nextWaveFunction: WaveFunction) => {
    if (nextWaveFunction) {
      setWaveFunction(nextWaveFunction);
    }
  };

  return (
    <ToggleGroup
      type="single"
      value={waveFunction}
      onValueChange={handleWaveFunctionChange}
      disabled={!images.length}
      {...props}
    >
      <ToggleGroupItem value={WAVE_FUNCTION.SIN}>
        <Sin />
      </ToggleGroupItem>
      <ToggleGroupItem value={WAVE_FUNCTION.COS}>
        <Cos />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
