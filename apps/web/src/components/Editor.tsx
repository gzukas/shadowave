import { Suspense } from 'react';
import { useAtomValue } from 'jotai';
import { Eclipse, Loader2 } from 'lucide-react';
import { Trans } from '@lingui/react/macro';
import { cn } from '@/lib/utils';
import { filesOrLinksAtom } from '@/atoms/imagesAtom';
import { AspectRatio } from '@/components/ui/AspectRatio';
import { Controls } from '@/components/Controls';
import { Graphics } from '@/components/Graphics';
import { ExportImage } from '@/components/ExportImage';
import { ChooseImages } from '@/components/ChooseImages';
import { Button } from '@/components/ui/Button';
import { SeeExample } from '@/components/SeeExample';
import { useImagesDisclosure } from '@/hooks/useImagesDisclosure';
import { CopyImage } from './CopyImage';

export type EditorProps = React.ComponentPropsWithoutRef<'div'>;

export function Editor(props: EditorProps) {
  const { className, ...other } = props;
  const filesOrLinks = useAtomValue(filesOrLinksAtom);
  const { open: openImages } = useImagesDisclosure();

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
        className="flex items-center justify-center bg-muted p-6"
      >
        {filesOrLinks.length ? (
          <Suspense
            fallback={
              <Loader2 className="size-12 animate-spin text-muted-foreground" />
            }
          >
            <Graphics />
          </Suspense>
        ) : (
          <div className="flex flex-col items-center gap-3 text-center lg:gap-6">
            <Eclipse className="size-12 lg:h-24 lg:w-24" />
            <h1 className="text-2xl lg:text-4xl">Shadowave</h1>
            <p className="max-w-[350px]">
              <Trans>
                Choose screenshots featuring both light and dark themes to start
                waving.
              </Trans>
            </p>
            <div className="flex gap-4">
              <Button variant="outline" onClick={openImages}>
                <Trans>Choose Images</Trans>
              </Button>
              <SeeExample />
            </div>
          </div>
        )}
      </AspectRatio>
      <div className="flex flex-col justify-between gap-8 p-6">
        <ChooseImages />
        <Suspense
          fallback={
            <Loader2 className="size-12 animate-spin self-center text-muted-foreground" />
          }
        >
          <Controls />
        </Suspense>
        <div className="flex gap-2">
          <ExportImage className="grow" />
          <CopyImage className="shrink-0" />
        </div>
      </div>
    </div>
  );
}
