import { useAtomValue, useSetAtom } from 'jotai';
import { WandSparkles } from 'lucide-react';
import { optimizeWaveformAtom } from '@/atoms/waveformAtoms';
import { Button } from '@workspace/ui/components/button';
import { unwrappedLargestImageAtom } from '@/atoms/largestImageAtom';

export function OptimizeWaveform() {
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
    >
      <WandSparkles className="group-active:rotate-12" />
    </Button>
  );
}
