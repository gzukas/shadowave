import { useAtom, useAtomValue } from 'jotai';
import { useLingui } from '@lingui/react/macro';
import { waveFunctionAtom } from '@/atoms/waveFunctionAtom';
import {
  ToggleGroup,
  ToggleGroupItem
} from '@workspace/ui/components/toggle-group';
import { unwrappedImagesAtom } from '@/atoms/imagesAtom';
import { Sin } from '@/icons/Sin';
import { Heartbeat } from '@/icons/Heartbeat';
import { WAVE_FUNCTION } from '@/constants';
import { WaveFunction } from '@/types';

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
  const { t } = useLingui();
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
      <ToggleGroupItem
        value={WAVE_FUNCTION.HEARTBEAT}
        aria-label={t`Heartbeat`}
      >
        <Heartbeat />
      </ToggleGroupItem>
      <ToggleGroupItem value={WAVE_FUNCTION.SIN} aria-label={t`Sine`}>
        <Sin />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
