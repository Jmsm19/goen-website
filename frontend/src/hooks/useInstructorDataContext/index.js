import { useContext } from 'react';

import { DataContext } from '../../context/DataContext';

const useInstructorDataContext = () => {
  const { getSenpaiModules } = useContext(DataContext);

  return {
    getSenpaiModules,
  };
};

export default useInstructorDataContext;
