import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const options: i18n.InitOptions = {
  fallbackLng: 'es',
  load: 'languageOnly',

  saveMissing: false,

  debug: false,

  interpolation: {
    escapeValue: false, // not needed for react
  },

  react: {
    wait: true,
  },

  detection: {
    caches: ['cookie'],
    lookupCookie: 'language',
    cookieMinutes: 10080, // 7 days
  },
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init(options);

export default i18n;
