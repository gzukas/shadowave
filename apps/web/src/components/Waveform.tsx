import { useAtomValue } from 'jotai';
import { Trans, useLingui } from '@lingui/react/macro';
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

export type WaveformProps = React.ComponentPropsWithoutRef<'div'>;

export function Waveform(props: WaveformProps) {
  const { t } = useLingui();
  const images = useAtomValue(unwrappedImagesAtom);
  const wavelengthMax = useAtomValue(wavelengthMaxAtom);
  const amplitudeMax = useAtomValue(amplitudeMaxAtom);

  return (
    <div {...props}>
      <AtomSlider
        label={<Trans>Rotation</Trans>}
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
        label={<Trans>Wavelength</Trans>}
        atom={wavelengthAtom}
        min={MIN_WAVELENGTH}
        max={wavelengthMax}
        disabled={!images.length}
        ThumbProps={{
          'aria-label': t`Wavelength`
        }}
      />
      <AtomSlider
        label={<Trans>Amplitude</Trans>}
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
