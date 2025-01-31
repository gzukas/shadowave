import { startTransition } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { ArrowDownUp, ArrowUpDown } from 'lucide-react';
import { Trans, useLingui } from '@lingui/react/macro';
import { areImagesReversedAtom } from '@/atoms/areImagesReversedAtom';
import { Button } from '@workspace/ui/components/button';
import { Tooltip } from '@workspace/ui/components/tooltip';
import { unwrappedImagesAtom } from '@/atoms/imagesAtom';

export function ReverseImages() {
  const { t } = useLingui();
  const images = useAtomValue(unwrappedImagesAtom);
  const [areImagesReversed, toggleImagesReversed] = useAtom(
    areImagesReversedAtom
  );

  const handleClick = () => {
    startTransition(() => {
      toggleImagesReversed();
    });
  };

  return (
    <Tooltip title={<Trans>Reverse images</Trans>}>
      <Button
        size="icon"
        onClick={handleClick}
        disabled={images.length < 2}
        aria-label={t`Reverse images`}
      >
        {areImagesReversed ? <ArrowDownUp /> : <ArrowUpDown />}
      </Button>
    </Tooltip>
  );
}
