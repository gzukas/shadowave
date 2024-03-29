import { useAtom, useAtomValue } from 'jotai';
import { Trans, msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { cn } from '@/lib/utils';
import { sensibleDefaultsEffect } from '@/atoms/sensibleDefaultsEffect';
import { amplitudeAtom } from '@/atoms/amplitudeAtom';
import { rotationAtom } from '@/atoms/rotationAtom';
import { frequencyAtom } from '@/atoms/frequencyAtom';
import { imageCountAtom } from '@/atoms/imagesAtom';
import { AtomSlider } from './AtomSlider';

export type ControlsProp = React.ComponentPropsWithoutRef<'div'>;

export function Controls(props: ControlsProp) {
  const { className, ...other } = props;
  const imageCount = useAtomValue(imageCountAtom);
  const { _ } = useLingui();

  useAtom(sensibleDefaultsEffect);

  return (
    <div className={cn('space-y-6', className)} {...other}>
      <AtomSlider
        label={<Trans>Rotation</Trans>}
        atom={rotationAtom}
        min={0}
        max={360}
        disabled={!imageCount}
        ThumbProps={{
          'aria-label': _(msg`Rotation`)
        }}
      />
      <AtomSlider
        label={<Trans>Frequncy</Trans>}
        atom={frequencyAtom}
        min={1}
        max={1000}
        disabled={!imageCount}
        ThumbProps={{
          'aria-label': _(msg`Frequncy`)
        }}
      />
      <AtomSlider
        label={<Trans>Amplitude</Trans>}
        atom={amplitudeAtom}
        min={0}
        max={1000}
        disabled={!imageCount}
        ThumbProps={{
          'aria-label': _(msg`Amplitude`)
        }}
      />
    </div>
  );
}
