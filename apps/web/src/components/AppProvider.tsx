import { useAtomValue } from 'jotai';
import { I18nProvider } from '@lingui/react';
import { TooltipProvider } from '@workspace/ui/components/tooltip';
import { i18nAtom } from '@/atoms/localeAtoms';

export function AppProvider(props: React.PropsWithChildren<unknown>) {
  const i18n = useAtomValue(i18nAtom);

  return (
    <I18nProvider i18n={i18n}>
      <TooltipProvider>{props.children}</TooltipProvider>
    </I18nProvider>
  );
}
