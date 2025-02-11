import { useTransition } from 'react';
import { useAtomValue } from 'jotai';
import { Trash2 } from 'lucide-react';
import { useResetAtom } from 'jotai/utils';
import { Trans, useLingui } from '@lingui/react/macro';
import { Button } from '@workspace/ui/components/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@workspace/ui/components/alert-dialog';
import { imagesAtom, unwrappedImagesAtom } from '@/atoms/imagesAtom';
import { waveformAtom } from '@/atoms/waveformAtoms';

export type RemoveImagesProps = React.ComponentProps<typeof Button>;

export function RemoveImages(props: RemoveImagesProps) {
  const { t } = useLingui();
  const [isPending, startTransition] = useTransition();
  const images = useAtomValue(unwrappedImagesAtom);
  const resetImages = useResetAtom(imagesAtom);
  const resetWaveform = useResetAtom(waveformAtom);

  const handleConfirm = () => {
    startTransition(() => {
      resetWaveform();
      resetImages();
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="icon"
          disabled={!images.length || isPending}
          aria-label={t`Remove images`}
          {...props}
        >
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <Trans>Remove images?</Trans>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <Trans>
              These images will be permanently removed. This action cannot be
              undone.
            </Trans>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            <Trans>Cancel</Trans>
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>
            <Trans>Remove</Trans>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
