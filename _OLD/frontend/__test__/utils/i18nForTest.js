import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const options = {
  defaultNS: 'common',
  defaultLanguage: 'es',
  defaultLng: 'es',
  fallbackLng: 'es',
  otherLanguages: ['en', 'jp'],
  localeSubpaths: true,

  debug: false,
  saveMissing: false,

  interpolation: {
    escapeValue: false, // not needed for react!!
  },

  // react i18next special options (optional)
  react: {
    wait: false,
  },
};

i18n.use(LanguageDetector).init(options);

export default i18n;
