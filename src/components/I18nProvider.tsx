import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { setupI18n } from "@lingui/core";
import { I18nProvider as LinguiI18nProvider } from "@lingui/react";
import { localeAtom } from "@/atoms/localeAtom";
import { messages as enMessages } from "@/locales/en";

export function I18nProvider({ children }: React.PropsWithChildren) {
  const locale = useAtomValue(localeAtom);
  const [i18n] = useState(() =>
    setupI18n({
      messages: {
        en: enMessages,
      },
      locale,
    })
  );

  useEffect(() => {
    i18n.activate(locale);
  }, [i18n, locale]);

  return <LinguiI18nProvider i18n={i18n}>{children}</LinguiI18nProvider>;
}
