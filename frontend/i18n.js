import NextI18Next from 'next-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const langDetector = new LanguageDetector(null, {
  cookieMinutes: 10080, // 7 days
});

const options = {
  defaultNS: 'common',
  defaultLanguage: 'es',
  defaultLng: 'es',
  otherLanguages: ['en', 'jp'],
  fallbackLng: 'es',
  localeSubpaths: false,
  use: [langDetector],

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

const I18Next = new NextI18Next(options);
export default options;
export const { appWithTranslation, config, withNamespaces, Link, i18n } = I18Next;
