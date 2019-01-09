import common from '../../static/locales/es/common.json';

const translations = {
  ...common,
};

const tFunction = key => {
  const keys = key.split('.');

  if (keys.length > 1) {
    let result;

    keys.map((k, index) => {
      result = index === 0 ? translations[k] : result[k];
      return 1;
    });

    return result;
  }

  return translations[key];
};

export default tFunction;
