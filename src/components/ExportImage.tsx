import { useAtom, useAtomValue } from 'jotai';
import { ImageDown, Save } from 'lucide-react';
import { Trans } from '@lingui/macro';
import { cn } from '@/lib/utils';
import { graphicsAtom } from '@/atoms/graphicsAtom';
import {
  ExportFileHandle,
  exportAtom,
  exportFileHandleAtom
} from '@/atoms/exportAtoms';
import { Button } from '@/components/ui/Button';
import { Separator } from '@/components/ui/Separator';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/Tooltip';
import { LOADABLE_STATE } from '@/constants';
import { LoadableIcon } from './LoadableIcon';

export type ExportImageProps = React.ComponentPropsWithoutRef<'div'>;

export function ExportImage(props: ExportImageProps) {
  const { className, ...other } = props;
  const graphics = useAtomValue(graphicsAtom);
  const exportFileHandle = useAtomValue(exportFileHandleAtom);
  const [exportState, exportAsImage] = useAtom(exportAtom);

  const isExporting = exportState === LOADABLE_STATE.LOADING;
  const disabled = !graphics || isExporting;

  const createExportClickHandler =
    (exportFileHandle?: ExportFileHandle) => () => {
      exportAsImage(exportFileHandle);
    };

  return (
    <div
      className={cn(
        'flex items-center space-x-1 overflow-hidden rounded-md bg-secondary text-secondary-foreground',
        className
      )}
      {...other}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="min-w-0 grow"
            variant="secondary"
            onClick={createExportClickHandler()}
            disabled={disabled}
          >
            <LoadableIcon
              state={exportState}
              fallback={exportFileHandle ? Save : ImageDown}
              className={cn('mr-2 size-4 shrink-0', {
                'animate-spin': isExporting
              })}
            />
            <div className="truncate">
              {exportFileHandle?.name ?? <Trans>Export</Trans>}
            </div>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <Trans>Save to</Trans>
        </TooltipContent>
      </Tooltip>
      {exportFileHandle && (
        <>
          <Separator orientation="vertical" className="h-[20px]" />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="secondary"
                className="shrink-0"
                size="icon"
                onClick={createExportClickHandler(null)}
                disabled={disabled}
              >
                <ImageDown className="size-4" />
                <span className="sr-only">
                  <Trans>Choose file</Trans>
                </span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <Trans>Choose file</Trans>
            </TooltipContent>
          </Tooltip>
        </>
      )}
    </div>
  );
}
