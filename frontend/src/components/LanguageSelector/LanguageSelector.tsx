import React from 'react';
import { useTranslation } from 'react-i18next';

import Select from '../UI/Select';

const LanguageSelector = () => {
  const { t, i18n } = useTranslation();
  const languages = [
    {
      text: t('Language.Spanish'),
      value: 'es',
    },
    {
      text: t('Language.English'),
      value: 'en',
    },
    {
      text: t('Language.Japanese'),
      value: 'jpn',
      disabled: true,
    },
  ];

  const changeLanguage = (lng: 'es' | 'en' | 'jpn') => i18n.changeLanguage(lng);

  return (
    <Select
      id='language'
      name='language'
      className='language-selector'
      options={languages}
      onChange={changeLanguage}
      defaultSelected={i18n.language}
    />
  );
};

LanguageSelector.propTypes = {};

export default LanguageSelector;
