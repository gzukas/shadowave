import { useAtomValue, useSetAtom } from 'jotai';
import { ImageDown, Loader2 } from 'lucide-react';
import { Trans } from '@lingui/macro';
import { cn } from '@/lib/utils';
import { graphicsAtom } from '@/atoms/graphicsAtom';
import { exportAtom, exportingAtom } from '@/atoms/exportAtoms';
import { Button, ButtonProps } from '@/components/ui/Button';

export type ExportProps = ButtonProps;

export function Export(props: ExportProps) {
  const graphics = useAtomValue(graphicsAtom);
  const exportAsImage = useSetAtom(exportAtom);
  const isExporting = useAtomValue(exportingAtom);
  const Icon = isExporting ? Loader2 : ImageDown;

  return (
    <Button
      onClick={exportAsImage}
      disabled={!graphics || isExporting}
      {...props}
    >
      <Icon
        className={cn('mr-2', 'h-4', 'w-4', {
          'animate-spin': isExporting
        })}
      />
      <Trans>Export</Trans>
    </Button>
  );
}
