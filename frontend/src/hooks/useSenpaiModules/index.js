import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useInstructors } from '../../store/context/UsersContext';

import { capitalize } from '../../lib/utils';

const useSenpaiModules = (senpai, role) => {
  const modules = senpai[`modulesAs${capitalize(role.toLowerCase())}`];
  const [isSearchingModules, setIsSearchingModules] = useState(false);
  const { getSenpaiModules } = useInstructors();

  useEffect(() => {
    if (!isSearchingModules && !modules) {
      setIsSearchingModules(true);
      getSenpaiModules(role.toLowerCase(), senpai.id);
    }

    if (isSearchingModules && modules) {
      setIsSearchingModules(false);
    }
  }, [senpai.id, role, modules, getSenpaiModules, isSearchingModules]);

  return { isSearchingModules, modules };
};

useSenpaiModules.propTypes = {
  role: PropTypes.string.isRequired,
  senpai: PropTypes.shape().isRequired,
};

export default useSenpaiModules;
