import { Language, LanguageArray } from 'core/models';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

export const langFromLCID = (lcid: string = Language.EN) => lcid.split(/[-_]/)[0].toLowerCase();

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
  compatibilityJSON: 'v3',
  ns: 'app',
  fallbackLng,
  lng: Language.EN,
  keySeparator: ':',
  nsSeparator: '::',
  initImmediate: true,
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
