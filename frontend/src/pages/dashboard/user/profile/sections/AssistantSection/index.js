import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { DataContext } from '../../../../../../context/DataContext';
import ModulesTable from '../../../../../../components/Tables/ModulesTable';

const AssistantSection = ({ t, assistant }) => {
  const { modulesAsAssistant: modules } = assistant;
  const [isSearchingModules, setIsSearchingModules] = useState(false);
  const { getSenpaiModules } = useContext(DataContext);

  useEffect(() => {
    if (!isSearchingModules && !modules) {
      setIsSearchingModules(true);
      getSenpaiModules('assistant', assistant.id);
    }

    if (isSearchingModules && modules) {
      setIsSearchingModules(false);
    }
  }, [assistant.id, getSenpaiModules, isSearchingModules, modules]);

  return (
    <section>
      <h1>{t('Instructor')}</h1>

      <div>
        <h2>{t('Module._plural')}</h2>
        <ModulesTable modules={modules || []} loading={isSearchingModules} />
      </div>
    </section>
  );
};

AssistantSection.propTypes = {
  t: PropTypes.func.isRequired,
  assistant: PropTypes.shape().isRequired,
};

export default AssistantSection;
