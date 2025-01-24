import { useAtom, useAtomValue } from 'jotai';
import { Camera, Monitor, Smartphone, Tablet } from 'lucide-react';
import { FileWithHandle } from 'browser-fs-access';
import { useForm } from 'react-hook-form';
import { typeboxResolver } from '@hookform/resolvers/typebox';
import { Type } from '@sinclair/typebox';
import { Trans, Plural, useLingui } from '@lingui/react/macro';
import { url, deviceType } from '@workspace/schema';
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
import { isImportOpenAtom } from '@/atoms/isImportOpenAtom';
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
import { LoadableIcon } from './LoadableIcon';
import { ImageSource, importAtom, Site } from '@/atoms/importAtom';
import { imagesAtom } from '@/atoms/imagesAtom';
import { LOADABLE_STATE } from '@/constants';

const importSchema = Type.Object({
  url,
  deviceType
});

export function ImportImages() {
  const { t } = useLingui();
  const images = useAtomValue(imagesAtom);
  const [isImportOpen, toggleImportOpen] = useAtom(isImportOpenAtom);
  const [importState, importImages] = useAtom(importAtom);

  const isImporting = importState === LOADABLE_STATE.LOADING;

  const form = useForm<Site>({
    resolver: typeboxResolver(importSchema),
    defaultValues: {
      url: '',
      deviceType: 'desktop'
    }
  });

  const handleSubmitOrFilesChange = async (imageSource: ImageSource | ImageSource[]) => {
    await importImages(Array.isArray(imageSource) ? imageSource : [imageSource]);
    toggleImportOpen(false)
  }

  const handleDeviceTypeChange =
    (handler: (...event: any[]) => void) => (deviceType?: string) => {
      if (deviceType) {
        handler(deviceType);
      }
    };

  return (
    <Dialog open={isImportOpen} onOpenChange={toggleImportOpen}>
      <DialogTrigger asChild>
        <Button className="flex grow">
          {images.length ? (
            <Plural
              value={images.length}
              one="# image"
              other="# images"
            />
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
                  <FormLabel>Site URL</FormLabel>
                  <FormControl>
                    <Input
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
                      size="sm"
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
