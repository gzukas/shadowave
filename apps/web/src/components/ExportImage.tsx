import { useAtom, useAtomValue } from 'jotai';
import { Download, ImageDown, Save } from 'lucide-react';
import { useHotkeys } from 'react-hotkeys-hook';
import { Trans, useLingui } from '@lingui/react/macro';
import { cn } from '@workspace/ui/lib/utils';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuShortcut,
  DropdownMenuItem
} from '@workspace/ui/components/dropdown-menu';
import { graphicsAtom } from '@/atoms/graphicsAtom';
import {
  ExportFileHandle,
  exportAtom,
  exportFileHandleAtom
} from '@/atoms/exportAtoms';
import { Button } from '@workspace/ui/components/button';
import { LoadableIcon } from '@/components/LoadableIcon';
import { Shortcut } from '@/components/Shortcut/Shortcut';
import { HOTKEYS, LOADABLE_STATE } from '@/constants';

export function ExportImage() {
  const { t } = useLingui();
  const graphics = useAtomValue(graphicsAtom);
  const exportFileHandle = useAtomValue(exportFileHandleAtom);
  const [exportState, exportAsImage] = useAtom(exportAtom);

  const isExporting = exportState === LOADABLE_STATE.LOADING;
  const disabled = !graphics || isExporting;

  const createExportClickHandler =
    (exportFileHandle?: ExportFileHandle) => () => {
      exportAsImage(exportFileHandle);
    };

  useHotkeys(
    [HOTKEYS.SAVE, HOTKEYS.SAVE_AS],
    (_, { hotkey }) => {
      exportAsImage(hotkey === HOTKEYS.SAVE ? exportFileHandle : null);
    },
    { enabled: () => !disabled, preventDefault: true }
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={!exportFileHandle}>
        <Button
          variant="ghost"
          onClick={createExportClickHandler(null)}
          disabled={disabled}
          aria-label={t`Choose file`}
        >
          <LoadableIcon
            state={exportState}
            fallback={ImageDown}
            className={cn({
              'animate-spin': isExporting
            })}
          />
          <div className="hidden sm:block">
            <Trans>Export</Trans>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-66">
        {exportFileHandle && (
          <DropdownMenuItem onClick={createExportClickHandler()}>
            <Save />
            <span className="truncate">
              <Trans>
                Save to <b>{exportFileHandle.name}</b>
              </Trans>
            </span>
            <DropdownMenuShortcut>
              <Shortcut keys={HOTKEYS.SAVE} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={createExportClickHandler(null)}>
          <Download />
          <span>
            <Trans>Save as</Trans>
          </span>
          <DropdownMenuShortcut>
            <Shortcut keys={HOTKEYS.SAVE_AS} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
