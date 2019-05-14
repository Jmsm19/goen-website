import { useContext } from 'react';

import { DataContext } from '../../context/DataContext';

const useSettingDataContext = () => {
  const { settings, updateSetting } = useContext(DataContext);

  return {
    settings,
    updateSetting,
  };
};

export default useSettingDataContext;
