import { Language } from 'core/models';
import { getAvailableBundleLanguage, i18n } from './index';

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
  const bundle = await import(`./locales/loc_app_${lang}`);

  Object.keys(bundle.i18n).forEach(ns => {
    i18n.addResourceBundle(lang, ns, bundle.i18n[ns]);
  });
};
