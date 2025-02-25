import { useAtomValue } from 'jotai';
import { Clipboard } from 'lucide-react';
import { useLingui } from '@lingui/react/macro';
import { cn } from '@workspace/ui/lib/utils';
import { Button } from '@workspace/ui/components/button';
import { Tooltip } from '@workspace/ui/components/tooltip';
import { graphicsAtom } from '@/atoms/graphicsAtom';
import { isClipboardSupported, useClipboard } from '@/hooks/useClipboard';
import { LOADABLE_STATE, MIME_TYPES } from '@/constants';
import { rasterize } from '@/utils/rasterize';
import { LoadableIcon } from './LoadableIcon';

export type CopyImageProps = Omit<
  React.ComponentProps<typeof Button>,
  'onClick' | 'disabled'
>;

export function CopyImage(props: CopyImageProps) {
  const { t } = useLingui();
  const graphics = useAtomValue(graphicsAtom);
  const { copy, state } = useClipboard();

  const isCopying = state === LOADABLE_STATE.LOADING;
  const isDisabled = !graphics || isCopying;

  const handleCopyClick = async () => {
    if (graphics) {
      await copy({
        [MIME_TYPES.png]: rasterize(graphics)
      });
    }
  };

  return isClipboardSupported ? (
    <Tooltip title={t`Copy PNG`}>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleCopyClick}
        disabled={isDisabled}
        aria-label={t`Copy PNG`}
        {...props}
      >
        <LoadableIcon
          state={state}
          fallback={Clipboard}
          className={cn({
            'animate-spin': isCopying
          })}
        />
      </Button>
    </Tooltip>
  ) : null;
}
