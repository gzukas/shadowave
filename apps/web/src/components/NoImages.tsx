import { useSetAtom } from 'jotai';
import { ImageOff, Folder } from 'lucide-react';
import { Trans } from '@lingui/react/macro';
import { Button } from '@workspace/ui/components/button';
import { Shortcut } from '@/components/Shortcut';
import { importAtom, importSignalAtom } from '@/atoms/importAtoms';
import { siteConfig } from '@/config/site';
import { HOTKEYS } from '@/constants';

export function NoImages() {
  const importImage = useSetAtom(importAtom);
  const toggleImportSignal = useSetAtom(importSignalAtom);

  const handleClick = () => {
    importImage(siteConfig.example);
  };

  const handleImportClick = () => {
    toggleImportSignal(true);
  };

  return (
    <div className="flex max-w-md flex-col items-center gap-6 text-center font-light">
      <ImageOff className="size-24 text-gray-400" strokeWidth={1.5} />
      <h1 className="text-4xl">
        <Trans>No images</Trans>
      </h1>
      <p>
        <Trans>
          Get started by importing your images or check out the example to see
          how it works.
        </Trans>
      </p>
      <div className="flex w-full flex-col justify-center gap-4 sm:flex-row">
        <Button onClick={handleImportClick}>
          <Folder />
          Import
          <Shortcut keys={HOTKEYS.IMPORT} />
        </Button>
        <Button onClick={handleClick} variant="secondary">
          <Trans>See example</Trans>
        </Button>
      </div>
    </div>
  );
}
