import { Language, LanguageArray } from 'core/models';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

export const langFromLCID = (lcid: string = Language.RU) => lcid.split(/[-_]/)[0].toLowerCase();

export const getAvailableBundleLanguage = (localeId: Language): Language => {
  const lang = langFromLCID(localeId) as Language;
  if (!!~LanguageArray.indexOf(lang)) {
    return lang;
  }
  return Language.EN;
};

const fallbackLng = {
  default: [Language.EN],
};

i18next.use(initReactI18next).init({
  ns: 'app',
  fallbackLng,
  lng: Language.RU,
  keySeparator: ':',
  nsSeparator: '::',
  initImmediate: true,
  interpolation: {
    escapeValue: false,
  },
});

export const i18n = i18next;
