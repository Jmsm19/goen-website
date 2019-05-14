import { useContext } from 'react';

import { DataContext } from '../../context/DataContext';

const useModuleDataContext = () => {
  const { allModulesSearched, modules, notFoundModules, getAllModules, getModule } = useContext(
    DataContext,
  );

  return {
    allModulesSearched,
    modules,
    notFoundModules,
    getAllModules,
    getModule,
  };
};

export default useModuleDataContext;
