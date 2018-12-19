import NextI18Next from 'next-i18next'
import LanguageDetector from 'i18next-browser-languagedetector';

const options = {
  defaultNS: 'common',
  defaultLanguage: 'es',
  defaultLng: 'es',
  otherLanguages: [
    'en',
    'jp'
  ],
  fallbackLng: 'es',
  localeSubpaths: true,
  use: [
    LanguageDetector
  ],

  // Common namespace used around site
  saveMissing: false,

  debug: false,

  interpolation: {
    escapeValue: false, // not needed for react
  },

  react: {
    wait: true,
  },
}
export default new NextI18Next(options);
