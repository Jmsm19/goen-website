import React from 'react';
import PropTypes from 'prop-types';

import ModulesTable from '../../../../../../components/Tables/ModulesTable';
import useSenpaiModules from '../../../../../../hooks/useSenpaiModules';

const AssistantSection = ({ t, assistant }) => {
  const { isSearchingModules, modules } = useSenpaiModules(assistant, 'assistant');

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
