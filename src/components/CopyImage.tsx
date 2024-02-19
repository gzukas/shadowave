import { useAtomValue } from 'jotai';
import { Ban, Check, Copy, Loader2, LucideIcon } from 'lucide-react';
import { Trans } from '@lingui/macro';
import { cn } from '@/lib/utils';
import { graphicsAtom } from '@/atoms/graphicsAtom';
import { Button } from '@/components/ui/Button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/Tooltip';
import {
  CopyState,
  isClipboardSupported,
  useClipboard
} from '@/hooks/useClipboard';
import { MIME_TYPES } from '@/constants';
import { rasterize } from '@/utils/rasterize';

const iconMapping: Record<CopyState, LucideIcon> = {
  copying: Loader2,
  copied: Check,
  error: Ban
};

export function CopyImage() {
  const graphics = useAtomValue(graphicsAtom);
  const { copy, state } = useClipboard();
  const Icon = state ? iconMapping[state] : Copy;

  const handleClick = async () => {
    if (graphics) {
      await copy({
        [MIME_TYPES.png]: rasterize(graphics)
      });
    }
  };

  return isClipboardSupported ? (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClick}
          disabled={!graphics || state === 'copying'}
        >
          <Icon
            className={cn('h-4 w-4', {
              'animate-spin': state === 'copying'
            })}
          />
          <span className="sr-only">
            <Trans>Copy PNG</Trans>
          </span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <Trans>Copy PNG</Trans>
      </TooltipContent>
    </Tooltip>
  ) : null;
}
