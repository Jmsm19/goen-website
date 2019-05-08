import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { DataContext } from '../../../../../../context/DataContext';
import ModulesTable from '../../../../../../components/Tables/ModulesTable';

const InstructorsSection = ({ t, instructor }) => {
  const { modulesAsInstructor: modules } = instructor;
  const [isSearchingModules, setIsSearchingModules] = useState(false);
  const { getSenpaiModules } = useContext(DataContext);

  useEffect(() => {
    if (!isSearchingModules && !modules) {
      setIsSearchingModules(true);
      getSenpaiModules('instructor', instructor.id);
    }

    if (isSearchingModules && modules) {
      setIsSearchingModules(false);
    }
  }, [instructor.id, getSenpaiModules, isSearchingModules, modules]);

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
