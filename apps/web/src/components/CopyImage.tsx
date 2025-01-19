import { useAtomValue } from 'jotai';
import { Copy } from 'lucide-react';
import { Trans } from '@lingui/react/macro';
import { cn } from '@/lib/utils';
import { graphicsAtom } from '@/atoms/graphicsAtom';
import { Button, ButtonProps } from '@/components/ui/Button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/Tooltip';
import { isClipboardSupported, useClipboard } from '@/hooks/useClipboard';
import { LOADABLE_STATE, MIME_TYPES } from '@/constants';
import { rasterize } from '@/utils/rasterize';
import { LoadableIcon } from './LoadableIcon';

export type CopyImageProps = Omit<ButtonProps, 'onClick' | 'disabled'>;

export function CopyImage(props: CopyImageProps) {
  const graphics = useAtomValue(graphicsAtom);
  const { copy, state } = useClipboard();

  const isCopying = state === LOADABLE_STATE.LOADING;

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
          disabled={!graphics || isCopying}
          {...props}
        >
          <LoadableIcon
            state={state}
            fallback={Copy}
            className={cn('h-4 w-4', {
              'animate-spin': isCopying
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
