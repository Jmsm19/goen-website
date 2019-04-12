import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const langDetector = new LanguageDetector(null, {
  cookieMinutes: 10080, // 7 days
});

const options = {
  fallbackLng: 'es',
  defaultLng: 'es',
  otherLanguages: ['en', 'jp'],
  load: 'languageOnly',

  // Common namespace used around site
  saveMissing: false,

  debug: false,

  interpolation: {
    escapeValue: false, // not needed for react
  },

  react: {
    wait: true,
  },
};

i18n
  .use(Backend)
  .use(langDetector)
  .use(initReactI18next)
  .init(options);

export default i18n;
