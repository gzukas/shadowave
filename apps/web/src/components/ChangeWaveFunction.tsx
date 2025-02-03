import { useAtom, useAtomValue } from 'jotai';
import { Trans } from '@lingui/react/macro';
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

export function ChangeWaveFunction() {
  const images = useAtomValue(unwrappedImagesAtom);
  const [waveFunction, setWaveFunction] = useAtom(waveFunctionAtom);

  const handleWaveFunctionChange = (waveFunction: WaveFunction) => {
    if (waveFunction) {
      setWaveFunction(waveFunction);
    }
  };

  return (
    <ToggleGroup
      type="single"
      value={waveFunction}
      onValueChange={handleWaveFunctionChange}
      disabled={!images.length}
    >
      <ToggleGroupItem value={WAVE_FUNCTION.SIN}>
        <Sin />
        <Trans>Sine</Trans>
      </ToggleGroupItem>
      <ToggleGroupItem value={WAVE_FUNCTION.COS}>
        <Cos />
        <Trans>Cosine</Trans>
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
