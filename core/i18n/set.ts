import { Language } from 'core/models';
import moment from 'moment';
import i18n, { getAvailableBundleLanguage } from './index';
import { getLocaleBundle } from './load';

export const setLocale = async (localeId: Language = Language.EN) => {
  const lang = getAvailableBundleLanguage(localeId);

  moment.locale(lang);
  await getLocaleBundle(lang);

  if (!i18n.isInitialized) {
    i18n.on('initialized', () => changeLanguage(lang));
  } else {
    changeLanguage(lang);
  }
};

const changeLanguage = (language: Language) => {
  i18n.changeLanguage(language, err => {
    if (err) {
      return console.error(err);
    }
    console.debug('Language changed to:', language);
  });
};
