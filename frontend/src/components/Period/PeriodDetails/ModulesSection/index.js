import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import classnames from 'classnames';

import ModuleSummaryCard from '../../../Cards/ModuleSummaryCard';
import ModuleCreateCard from '../../../Cards/ModuleCreateCard';

const ModulesSection = ({
  t,
  modules,
  selectModule,
  className,
  showCreateCard,
  onCreateCardClick,
  ...props
}) => {
  const sectionClassNames = classnames(['modules-section', className]);

  return (
    <section className={sectionClassNames} {...props}>
      {showCreateCard && <ModuleCreateCard onClick={onCreateCardClick} />}

      {modules.map(module => (
        <ModuleSummaryCard key={uuid()} module={module} onClick={selectModule} />
      ))}
    </section>
  );
};

ModulesSection.defaultProps = {
  modules: [],
  className: null,
  showCreateCard: false,
  onCreateCardClick: () => null,
};

ModulesSection.propTypes = {
  className: PropTypes.string,
  t: PropTypes.func.isRequired,
  selectModule: PropTypes.func.isRequired,
  showCreateCard: PropTypes.bool,
  onCreateCardClick: PropTypes.func,
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

export default ModulesSection;
