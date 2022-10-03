import { Language } from 'core/models';
import i18n, { getAvailableBundleLanguage } from './index';
import { i18n as en } from './locales/loc_app_en';
import { i18n as ru } from './locales/loc_app_ru';

const languages = {
  ru,
  en,
};

export const getLocaleBundle = async (localeId = Language.RU) => {
  const lang = getAvailableBundleLanguage(localeId);

  if (i18n.hasResourceBundle(lang, 'app')) {
    return i18n.getResourceBundle(lang, 'app');
  }

  try {
    tryGetLocaleBundle(lang);
  } catch (e) {
    console.error('Could not load locale bundle', e);
  }

  return i18n.getResourceBundle(lang, 'app');
};

const tryGetLocaleBundle = async (lang: Language) => {
  //Dinamic import doesn't work in React-Native!
  const bundle = { i18n: languages[lang] };

  Object.keys(bundle.i18n).forEach(ns => {
    i18n.addResourceBundle(lang, ns, bundle.i18n[ns as keyof { app: object }]);
  });
};
