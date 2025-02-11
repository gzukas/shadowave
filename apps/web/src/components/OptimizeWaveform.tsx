import { useAtomValue, useSetAtom } from 'jotai';
import { WandSparkles } from 'lucide-react';
import { optimizeWaveformAtom } from '@/atoms/waveformAtoms';
import { Button } from '@workspace/ui/components/button';
import { unwrappedLargestImageAtom } from '@/atoms/largestImageAtom';
import { useLingui } from '@lingui/react/macro';
import { Tooltip } from '@workspace/ui/components/tooltip';

export function OptimizeWaveform() {
  const { t } = useLingui();
  const largestImage = useAtomValue(unwrappedLargestImageAtom);
  const optimizeWaveform = useSetAtom(optimizeWaveformAtom);

  const handleClick = () => {
    optimizeWaveform(largestImage);
  };

  return (
    <Tooltip title={t`Optimize`}>
      <Button
        onClick={handleClick}
        size="icon"
        variant="ghost"
        className="group"
        disabled={!largestImage}
        aria-label={t`Optimize`}
      >
        <WandSparkles className="transition-transform ease-in-out group-active:rotate-30" />
      </Button>
    </Tooltip>
  );
}
