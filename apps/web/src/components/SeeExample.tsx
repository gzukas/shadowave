import { useSetAtom } from 'jotai';
import { Trans } from '@lingui/react/macro';
import { Button } from '@workspace/ui/components/button';
import { siteConfig } from '@/config/site';
import { importAtom } from '@/atoms/importAtoms';

export function SeeExample() {
  const importImage = useSetAtom(importAtom);

  const handleClick = () => {
    importImage(siteConfig.example);
  };

  return (
    <Button onClick={handleClick} variant="outline">
      <Trans>See Example</Trans>
    </Button>
  );
}
