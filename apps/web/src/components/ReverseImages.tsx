import { useAtom, useAtomValue } from 'jotai';
import { ArrowDownUp, ArrowUpDown } from 'lucide-react';
import { Trans, useLingui } from '@lingui/react/macro';
import { areImagesReversedAtom } from '@/atoms/areImagesReversedAtom';
import { imagesAtom } from '@/atoms/imagesAtom';
import { Button } from '@workspace/ui/components/button';
import { Tooltip } from '@workspace/ui/components/tooltip';

export function ReverseImages() {
  const { t } = useLingui();
  const [areImagesReversed, toggleImagesReversed] = useAtom(
    areImagesReversedAtom
  );
  const images = useAtomValue(imagesAtom);
  const Icon = areImagesReversed ? ArrowDownUp : ArrowUpDown;

  const handleClick = () => {
    toggleImagesReversed();
  };

  return (
    <Tooltip title={<Trans>Reverse images</Trans>}>
      <Button
        size="icon"
        onClick={handleClick}
        disabled={images.length < 2}
        aria-label={t`Reverse images`}
      >
        <Icon className="size-4" />
      </Button>
    </Tooltip>
  );
}
