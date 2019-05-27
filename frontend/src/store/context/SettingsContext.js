import React from 'react';

import { GetData, SendData } from '../../lib/utils/http';
import { snakeCaseToCamelCase } from '../../lib/utils';

const SettingsContext = React.createContext();

const SettingsProvider = props => {
  const [settings, setSettings] = React.useState(null);

  const value = React.useMemo(
    () => ({
      settings,
      setSettings,
    }),
    [settings],
  );

  return <SettingsContext.Provider value={value} {...props} />;
};

const useSettings = () => {
  const context = React.useContext(SettingsContext);

  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider');
  }

  const { settings, setSettings } = context;

  const actions = {
    getSettings: () =>
      GetData('settings').then(({ data }) => {
        setSettings({ ...data });
      }),
    updateSetting: (settingName, value) => {
      SendData('PUT', 'settings', { settingName, value }).then(() => {
        setSettings({
          ...settings,
          [snakeCaseToCamelCase(settingName)]: value,
        });
      });
    },
  };

  return {
    settings,
    ...actions,
  };
};

export { SettingsProvider, useSettings };
