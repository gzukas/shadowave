import { useAtom, useAtomValue } from 'jotai';
import { Trans, msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { cn } from '@/lib/utils';
import { sensibleDefaultsEffect } from '@/atoms/sensibleDefaultsEffect';
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
import { imageCountAtom } from '@/atoms/imagesAtom';
import { scaleAtom } from '@/atoms/scaleAtom';
import { AtomSlider } from './AtomSlider';

export type ControlsProp = React.ComponentPropsWithoutRef<'div'>;

export function Controls(props: ControlsProp) {
  const { className, ...other } = props;
  const { _ } = useLingui();
  const imageCount = useAtomValue(imageCountAtom);
  const maxAmplitude = useAtomValue(maxAmplitudeAtom);
  const maxWavelength = useAtomValue(maxWavelengthAtom);
  const scale = useAtomValue(scaleAtom);

  useAtom(sensibleDefaultsEffect);

  const renderValueInPx = (value: number) => `${Math.round(value * scale)}px`;

  return (
    <div className={cn('space-y-6', className)} {...other}>
      <AtomSlider
        label={<Trans>Rotation</Trans>}
        atom={rotationAtom}
        renderValue={rotation => `${rotation}°`}
        min={0}
        max={360}
        disabled={!imageCount}
        ThumbProps={{
          'aria-label': _(msg`Rotation`)
        }}
      />
      <AtomSlider
        label={<Trans>Wavelength</Trans>}
        atom={wavelengthAtom}
        renderValue={renderValueInPx}
        min={MIN_WAVELENGTH}
        max={maxWavelength}
        disabled={!imageCount}
        ThumbProps={{
          'aria-label': _(msg`Wavelength`)
        }}
      />
      <AtomSlider
        label={<Trans>Amplitude</Trans>}
        atom={amplitudeAtom}
        renderValue={renderValueInPx}
        min={MIN_AMPLITUDE}
        max={maxAmplitude}
        disabled={!imageCount}
        ThumbProps={{
          'aria-label': _(msg`Amplitude`)
        }}
      />
    </div>
  );
}
