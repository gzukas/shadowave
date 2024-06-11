import { useAtomValue } from 'jotai';
import { Trash2 } from 'lucide-react';
import { Trans, Plural } from '@lingui/macro';
import { cn } from '@/lib/utils';
import { filesOrLinksAtom } from '@/atoms/imagesAtom';
import { Button } from '@/components/ui/Button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/Tooltip';
import { useImagesDisclosure } from '@/hooks/useImagesDisclosure';
import { ReverseImages } from './ReverseImages';

export type ChooseImagesProps = React.ComponentPropsWithoutRef<'div'>;

export function ChooseImages(props: ChooseImagesProps) {
  const { className, ...other } = props;
  const { open, close } = useImagesDisclosure();
  const filesOrLinks = useAtomValue(filesOrLinksAtom);

  return (
    <div
      className={cn(
        'flex',
        'items-center',
        'gap-1',
        'rounded-md',
        'bg-secondary',
        className
      )}
      {...other}
    >
      <ReverseImages />
      <Button variant="secondary" className="flex grow" onClick={open}>
        {filesOrLinks.length ? (
          <Plural value={filesOrLinks.length} one="# image" other="# images" />
        ) : (
          <Trans>Choose Images</Trans>
        )}
      </Button>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="secondary"
            size="icon"
            onClick={close}
            disabled={!filesOrLinks.length}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">
              <Trans>Remove images</Trans>
            </span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <Trans>Remove images</Trans>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
