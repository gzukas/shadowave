import { useAtomValue } from 'jotai';
import { useLingui } from '@lingui/react/macro';
import {
  rotationAtom,
  wavelengthAtom,
  wavelengthMaxAtom,
  amplitudeAtom,
  amplitudeMaxAtom,
  MIN_WAVELENGTH,
  MIN_AMPLITUDE
} from '@/atoms/waveformAtoms';
import { AtomSlider } from '@/components/AtomSlider';
import { unwrappedImagesAtom } from '@/atoms/imagesAtom';

export type WaveformProps = React.ComponentProps<'div'>;

export function Waveform(props: WaveformProps) {
  const { t } = useLingui();
  const images = useAtomValue(unwrappedImagesAtom);
  const wavelengthMax = useAtomValue(wavelengthMaxAtom);
  const amplitudeMax = useAtomValue(amplitudeMaxAtom);

  return (
    <div {...props}>
      <AtomSlider
        label={t`Rotation`}
        atom={rotationAtom}
        renderValue={rotation => `${rotation}°`}
        min={0}
        max={360}
        disabled={!images.length}
        ThumbProps={{
          'aria-label': t`Rotation`
        }}
      />
      <AtomSlider
        label={t`Wavelength`}
        atom={wavelengthAtom}
        min={MIN_WAVELENGTH}
        max={wavelengthMax}
        disabled={!images.length}
        ThumbProps={{
          'aria-label': t`Wavelength`
        }}
      />
      <AtomSlider
        label={t`Amplitude`}
        atom={amplitudeAtom}
        min={MIN_AMPLITUDE}
        max={amplitudeMax}
        disabled={!images.length}
        ThumbProps={{
          'aria-label': t`Amplitude`
        }}
      />
    </div>
  );
}
