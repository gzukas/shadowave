import { Suspense } from 'react';
import { Eclipse, Loader2 } from 'lucide-react';
import { Trans } from '@lingui/react/macro';
import { cn } from '@workspace/ui/lib/utils';
import { AspectRatio } from '@workspace/ui/components/aspect-ratio';
import { Waveform } from '@/components/Waveform';
import { Graphics } from '@/components/Graphics';
import { ExportImage } from '@/components/ExportImage';
import { SeeExample } from '@/components/SeeExample';
import { CopyImage } from '@/components/CopyImage';
import { ReverseImages } from '@/components/ReverseImages';
import { ImportImages } from '@/components/ImportImages';
import { RemoveImages } from '@/components/RemoveImages';
import { ChangeWaveFunction } from '@/components/ChangeWaveFunction';
import { OptimizeWaveform } from '@/components/OptimizeWaveform';
import { useSetAtom } from 'jotai';
import { graphicsAtom } from '@/atoms/graphicsAtom';

export type EditorProps = React.ComponentPropsWithoutRef<'div'>;

export function Editor(props: EditorProps) {
  const { className, ...other } = props;
  const setGraphics = useSetAtom(graphicsAtom);

  return (
    <div
      className={cn(
        'grid divide-y overflow-hidden sm:rounded-xl sm:border sm:shadow-md md:shadow-xl lg:grid-cols-[1fr_340px] lg:divide-x lg:divide-y-0',
        className
      )}
      {...other}
    >
      <AspectRatio
        ratio={16 / 9}
        className="bg-muted flex items-center justify-center p-6"
      >
        <Suspense
          fallback={
            <Loader2 className="text-muted-foreground size-12 animate-spin" />
          }
        >
          <Graphics
            ref={setGraphics}
            fallback={
              <div className="flex flex-col items-center gap-3 text-center lg:gap-6">
                <Eclipse className="size-12 lg:h-24 lg:w-24" />
                <h1 className="text-2xl lg:text-4xl">Shadowave</h1>
                <p className="max-w-[350px]">
                  <Trans>
                    Import images featuring both light and dark themes to start.
                  </Trans>
                </p>
                <SeeExample />
              </div>
            }
          />
        </Suspense>
      </AspectRatio>

      <div className="flex flex-col justify-between gap-8 p-6">
        <div className="flex flex-col gap-4">
          <div className="bg-primary flex gap-1 rounded-md">
            <ReverseImages />
            <ImportImages className="grow" />
            <RemoveImages />
          </div>
          <div className="flex flex-row justify-between">
            <ChangeWaveFunction />
            <OptimizeWaveform />
          </div>
        </div>
        <Waveform className="space-y-8" />
        <div className="flex gap-2">
          <ExportImage className="grow" />
          <CopyImage className="shrink-0" />
        </div>
      </div>
    </div>
  );
}
