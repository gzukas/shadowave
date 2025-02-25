import { useAtomValue } from 'jotai';
import { useLingui } from '@lingui/react/macro';
import {
  rotationAtom,
  wavelengthAtom,
  wavelengthMaxAtom,
  amplitudeAtom,
  amplitudeMaxAtom,
  MIN_WAVELENGTH,
  MIN_AMPLITUDE,
  MIN_ROTATION,
  MAX_ROTATION
} from '@/atoms/waveformAtoms';
import { AtomSlider } from '@/components/AtomSlider';
import { unwrappedImagesAtom } from '@/atoms/imagesAtom';
import { HOTKEYS } from '@/constants';

export function Waveform() {
  const { t } = useLingui();
  const images = useAtomValue(unwrappedImagesAtom);
  const wavelengthMax = useAtomValue(wavelengthMaxAtom);
  const amplitudeMax = useAtomValue(amplitudeMaxAtom);
  const disabled = !images.length;

  return (
    <>
      <AtomSlider
        label={t`Rotation`}
        atom={rotationAtom}
        min={MIN_ROTATION}
        max={MAX_ROTATION}
        disabled={disabled}
        hotkeys={[HOTKEYS.ROTATION_UP, HOTKEYS.ROTATION_DOWN]}
        thumbProps={{
          'aria-label': t`Rotation`
        }}
      />
      <AtomSlider
        label={t`Wavelength`}
        atom={wavelengthAtom}
        min={MIN_WAVELENGTH}
        max={wavelengthMax}
        disabled={disabled}
        hotkeys={[HOTKEYS.WAVELENGTH_UP, HOTKEYS.WAVELENGTH_DOWN]}
        thumbProps={{
          'aria-label': t`Wavelength`
        }}
      />
      <AtomSlider
        label={t`Amplitude`}
        atom={amplitudeAtom}
        min={MIN_AMPLITUDE}
        max={amplitudeMax}
        disabled={disabled}
        hotkeys={[HOTKEYS.AMPLITUDE_UP, HOTKEYS.AMPLITUDE_DOWN]}
        thumbProps={{
          'aria-label': t`Amplitude`
        }}
      />
    </>
  );
}
