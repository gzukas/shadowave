import { useAtomValue } from 'jotai';
import { Trans, useLingui } from '@lingui/react/macro';
import { rotationAtom } from '@/atoms/rotationAtom';
import {
  MIN_WAVELENGTH,
  maxWavelengthAtom,
  wavelengthAtom
} from '@/atoms/wavelengthAtoms';
import {
  MIN_AMPLITUDE,
  amplitudeAtom,
  maxAmplitudeAtom
} from '@/atoms/amplitudeAtoms';
import { imagesAtom } from '@/atoms/imagesAtom';
import { scaleAtom } from '@/atoms/scaleAtom';
import { AtomSlider } from '@/components/AtomSlider';

export function Waveform() {
  const { t } = useLingui();
  const images = useAtomValue(imagesAtom);
  const maxAmplitude = useAtomValue(maxAmplitudeAtom);
  const maxWavelength = useAtomValue(maxWavelengthAtom);
  const scale = useAtomValue(scaleAtom);

  const renderValueInPx = (value: number) => `${Math.round(value * scale)}px`;

  return (
    <>
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
        renderValue={renderValueInPx}
        min={MIN_WAVELENGTH}
        max={maxWavelength}
        disabled={!images.length}
        ThumbProps={{
          'aria-label': t`Wavelength`
        }}
      />
      <AtomSlider
        label={<Trans>Amplitude</Trans>}
        atom={amplitudeAtom}
        renderValue={renderValueInPx}
        min={MIN_AMPLITUDE}
        max={maxAmplitude}
        disabled={!images.length}
        ThumbProps={{
          'aria-label': t`Amplitude`
        }}
      />
    </>
  );
}
