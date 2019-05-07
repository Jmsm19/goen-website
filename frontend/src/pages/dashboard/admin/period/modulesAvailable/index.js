import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';

import ModuleSummaryCard from '../../../../../components/Cards/ModuleSummaryCard';

const ModulesAvailable = ({ t, modules, selectModule }) => (
  <>
    <h2 className='section-title'>{t('Module._plural')}</h2>
    <section className='modules-section'>
      {modules.map(module => (
        <ModuleSummaryCard key={uuid()} module={module} onClick={selectModule} />
      ))}
    </section>
  </>
);

ModulesAvailable.defaultProps = {
  modules: [],
};

ModulesAvailable.propTypes = {
  t: PropTypes.func.isRequired,
  selectModule: PropTypes.func.isRequired,
  modules: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      schedule: PropTypes.shape({
        day: PropTypes.string,
        from: PropTypes.string,
        until: PropTypes.string,
      }),
    }),
  ),
};

export default ModulesAvailable;
