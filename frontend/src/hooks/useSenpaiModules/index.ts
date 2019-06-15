import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { useInstructors } from '../../store/context/UsersContext';

const useSenpaiModules = (senpai: User, role: 'instructor' | 'assistant') => {
  const modules = role === 'instructor' ? senpai.modulesAsInstructor : senpai.modulesAsAssistant;

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
  senpai: PropTypes.shape({}).isRequired,
};

export default useSenpaiModules;
