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

  const changeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { target } = event;
    i18n.changeLanguage(target.value);
  };

  return (
    <Select
      id='language'
      name='language'
      className='language-selector'
      options={languages}
      onChange={changeLanguage}
      value={i18n.language}
    />
  );
};

LanguageSelector.propTypes = {};

export default LanguageSelector;
