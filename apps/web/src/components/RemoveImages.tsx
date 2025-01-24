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
import { imagesAtom } from '@/atoms/imagesAtom';

export function RemoveImages() {
  const { t } = useLingui();
  const images = useAtomValue(imagesAtom);
  const resetImages = useResetAtom(imagesAtom);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="icon"
          disabled={!images.length}
          aria-label={t`Remove images`}
        >
          <Trash2 className="size-4" />
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
          <AlertDialogAction onClick={resetImages}>
            <Trans>Remove</Trans>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
