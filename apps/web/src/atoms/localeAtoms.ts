import { atom } from 'jotai';
import { observe } from 'jotai-effect';
import { atomWithStorage } from 'jotai/utils';
import { setupI18n } from '@lingui/core';
import { messages as enMessages } from '@/locales/en';

export const i18nAtom = atom(
  setupI18n({
    messages: {
      en: enMessages
    }
  })
);

export const localeAtom = atomWithStorage('locale', 'en', undefined, {
  getOnInit: true
});

observe(get => {
  const i18n = get.peek(i18nAtom);
  i18n.activate(get(localeAtom));
});
