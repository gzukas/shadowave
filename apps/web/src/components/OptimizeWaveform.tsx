import { useAtomValue, useSetAtom } from 'jotai';
import { WandSparkles } from 'lucide-react';
import { optimizeWaveformAtom } from '@/atoms/waveformAtoms';
import { Button } from '@workspace/ui/components/button';
import { unwrappedLargestImageAtom } from '@/atoms/largestImageAtom';
import { useLingui } from '@lingui/react/macro';

export function OptimizeWaveform() {
  const { t } = useLingui();
  const largestImage = useAtomValue(unwrappedLargestImageAtom);
  const optimizeWaveform = useSetAtom(optimizeWaveformAtom);

  const handleClick = () => {
    optimizeWaveform(largestImage);
  };

  return (
    <Button
      onClick={handleClick}
      size="icon"
      variant="ghost"
      className="group"
      disabled={!largestImage}
      aria-label={t`Optimize waveform`}
    >
      <WandSparkles className="group-active:rotate-12" />
    </Button>
  );
}
