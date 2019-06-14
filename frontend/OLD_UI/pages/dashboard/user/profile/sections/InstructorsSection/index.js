import React from 'react';
import PropTypes from 'prop-types';

import ModulesTable from '../../../../../../components/Tables/ModulesTable';
import useSenpaiModules from '../../../../../../hooks/useSenpaiModules';

const InstructorsSection = ({ t, instructor }) => {
  const { isSearchingModules, modules } = useSenpaiModules(instructor, 'instructor');

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

InstructorsSection.propTypes = {
  t: PropTypes.func.isRequired,
  instructor: PropTypes.shape().isRequired,
};

export default InstructorsSection;
