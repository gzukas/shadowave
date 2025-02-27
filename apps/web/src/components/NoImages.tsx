import { useSetAtom } from 'jotai';
import { ImageOff, Folder } from 'lucide-react';
import { Trans } from '@lingui/react/macro';
import { cn } from '@workspace/ui/lib/utils';
import { Button } from '@workspace/ui/components/button';
import { Shortcut } from '@/components/Shortcut';
import { importAtom, importSignalAtom } from '@/atoms/importAtoms';
import { siteConfig } from '@/config/site';
import { HOTKEYS } from '@/constants';

export type NoImagesProps = React.ComponentProps<'div'>;

export function NoImages(props: NoImagesProps) {
  const importImage = useSetAtom(importAtom);
  const toggleImportSignal = useSetAtom(importSignalAtom);

  const handleClick = () => {
    importImage(siteConfig.example);
  };

  const handleImportClick = () => {
    toggleImportSignal(true);
  };

  return (
    <div
      {...props}
      className={cn(
        'flex max-w-md flex-col items-center gap-6 text-center font-light',
        props.className
      )}
    >
      <ImageOff
        className="size-16 text-gray-400 md:size-24"
        strokeWidth={1.5}
      />
      <h1 className="text-3xl">
        <Trans>No images</Trans>
      </h1>
      <p>
        <Trans>
          Get started by choosing your images or check out the example to see
          how it works.
        </Trans>
      </p>
      <div className="flex w-full flex-col justify-center gap-4 sm:flex-row">
        <Button onClick={handleImportClick}>
          <Folder />
          Open
          <Shortcut keys={HOTKEYS.IMPORT} />
        </Button>
        <Button onClick={handleClick} variant="secondary">
          <Trans>See example</Trans>
        </Button>
      </div>
    </div>
  );
}
