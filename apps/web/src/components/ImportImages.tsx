import { useAtom, useAtomValue } from 'jotai';
import { Camera, Monitor, Smartphone, Tablet } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Trans, Plural, useLingui } from '@lingui/react/macro';
import { cn } from '@workspace/ui/lib/utils';
import { Button } from '@workspace/ui/components/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@workspace/ui/components/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@workspace/ui/components/form';
import { Input } from '@workspace/ui/components/input';
import {
  ToggleGroup,
  ToggleGroupItem
} from '@workspace/ui/components/toggle-group';
import { ChooseFiles } from '@/components/ChooseFiles';
import { LoadableIcon } from '@/components/LoadableIcon';
import { importAtom, importSignalAtom } from '@/atoms/importAtoms';
import { unwrappedImagesAtom } from '@/atoms/imagesAtom';
import { isValidationError } from '@/utils/client';
import { LOADABLE_STATE } from '@/constants';
import { Site } from '@/types';

export type ImportImagesProps = React.ComponentProps<typeof Button>;

export function ImportImages(props: ImportImagesProps) {
  const { t } = useLingui();
  const images = useAtomValue(unwrappedImagesAtom);
  const [importState, importImages] = useAtom(importAtom);
  const [importSignal, toggleImportSignal] = useAtom(importSignalAtom);

  const isImporting = importState === LOADABLE_STATE.LOADING;

  const form = useForm<Site>({
    reValidateMode: 'onSubmit',
    defaultValues: {
      url: '',
      deviceType: 'desktop'
    }
  });

  const handleSubmitOrFilesChange = async (imageSource: Site | File[]) => {
    try {
      await importImages(imageSource);
      toggleImportSignal(false);
    } catch (error) {
      if (isValidationError(error)) {
        switch (error.path) {
          case '/url':
            form.setError('url', error);
            break;
          case '/deviceType':
            form.setError('deviceType', error);
        }
      }
    }
  };

  const handleDeviceTypeChange =
    (handler: (...event: unknown[]) => void) => (deviceType?: string) => {
      if (deviceType) {
        handler(deviceType);
      }
    };

  return (
    <Dialog open={Boolean(importSignal)} onOpenChange={toggleImportSignal}>
      <DialogTrigger asChild>
        <Button {...props}>
          {images.length ? (
            <Plural value={images.length} one="# image" other="# images" />
          ) : (
            <Trans>Import</Trans>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Trans>Import</Trans>
          </DialogTitle>
          <DialogDescription>
            <Trans>
              The side should respond to the light and dark themes using the{' '}
              <code>prefers-color-scheme</code> media query. If it does not,
              choose files instead.
            </Trans>
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmitOrFilesChange)}
            className="grid gap-4"
          >
            <FormField
              control={form.control}
              name="url"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>
                    <Trans>Site URL</Trans>
                    <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      required
                      placeholder={t`https://example.com`}
                      {...field}
                    />
                  </FormControl>
                  {fieldState.invalid ? (
                    <FormMessage />
                  ) : (
                    <FormDescription>
                      <Trans>
                        Start with web protocol, e.g. <code>https://</code>
                      </Trans>
                    </FormDescription>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deviceType"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ToggleGroup
                      value={field.value}
                      onValueChange={handleDeviceTypeChange(field.onChange)}
                      type="single"
                      variant="outline"
                    >
                      <ToggleGroupItem
                        value="desktop"
                        aria-label={t`Desktop`}
                        className="flex-grow"
                      >
                        <Monitor className="size-4" />
                        <Trans>Desktop</Trans>
                      </ToggleGroupItem>
                      <ToggleGroupItem
                        value="tablet"
                        aria-label={t`Tablet`}
                        className="flex-grow"
                      >
                        <Tablet className="size-4" />
                        <Trans>Tablet</Trans>
                      </ToggleGroupItem>
                      <ToggleGroupItem
                        value="mobile"
                        aria-label={t`Mobile`}
                        className="flex-grow"
                      >
                        <Smartphone className="size-4" />
                        <Trans>Mobile</Trans>
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </FormControl>
                  <FormMessage />
                  <FormDescription></FormDescription>
                </FormItem>
              )}
            />
            <DialogFooter>
              <ChooseFiles
                type="button"
                options={{ mimeTypes: ['image/*'] }}
                onFilesChange={handleSubmitOrFilesChange}
                variant="outline"
                className="mt-2 sm:mt-0"
              >
                <Trans>Choose Files</Trans>
              </ChooseFiles>
              <Button
                type="submit"
                className="mt-2 sm:mt-0"
                disabled={isImporting}
              >
                <LoadableIcon
                  state={importState}
                  fallback={Camera}
                  className={cn('size-4', {
                    'animate-spin': isImporting
                  })}
                />
                <Trans>Import</Trans>
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
