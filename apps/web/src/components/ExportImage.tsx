import { useAtom, useAtomValue } from 'jotai';
import { ImageDown, Save } from 'lucide-react';
import { Trans } from '@lingui/react/macro';
import { cn } from '@workspace/ui/lib/utils';
import { graphicsAtom } from '@/atoms/graphicsAtom';
import {
  ExportFileHandle,
  exportAtom,
  exportFileHandleAtom
} from '@/atoms/exportAtoms';
import { Button } from '@workspace/ui/components/button';
import { Separator } from '@workspace/ui/components/separator';
import { Tooltip } from '@workspace/ui/components/tooltip';
import { LoadableIcon } from '@/components/LoadableIcon';
import { LOADABLE_STATE } from '@/constants';

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
        'bg-secondary text-secondary-foreground flex items-center space-x-1 overflow-hidden rounded-md',
        className
      )}
      {...other}
    >
      <Tooltip title={<Trans>Save to</Trans>}>
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
      </Tooltip>
      {exportFileHandle && (
        <>
          <Separator orientation="vertical" className="h-[20px]" />
          <Tooltip title={<Trans>Choose file</Trans>}>
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
          </Tooltip>
        </>
      )}
    </div>
  );
}
