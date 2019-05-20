import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import classnames from 'classnames';

import { useModules } from '../../../../context/ModulesContext';
import useEffectOnce from '../../../../hooks/useEffectOnce';

import ModuleSummaryCard from '../../../Cards/ModuleSummaryCard';
import ModuleCreateCard from '../../../Cards/ModuleCreateCard';

import { sortModules } from '../../../../lib/utils';
import Loading from '../../../Loading';

const ModulesSection = props => {
  const { periodId, selectModule, className, showCreateCard, onCreateCardClick, ...rest } = props;
  const { modules, searchedPeriods, getModulesForPeriod } = useModules();

  const sectionClassNames = classnames(['modules-section', className]);
  const hasSearchedPeriod = searchedPeriods.includes(periodId);

  useEffectOnce(() => {
    if (!hasSearchedPeriod) {
      getModulesForPeriod(periodId);
    }
  });

  const modulesArr = React.useMemo(() => {
    const arr = [];
    modules.forEach(module => {
      if (module.period.id === periodId) {
        arr.push(module);
      }
    });
    return arr;
  }, [modules, periodId]);

  const sortedModules = React.useMemo(() => sortModules(modulesArr), [modulesArr]);

  return hasSearchedPeriod ? (
    <section className={sectionClassNames} {...rest}>
      {showCreateCard && <ModuleCreateCard onClick={onCreateCardClick} />}

      {sortedModules.map(module => (
        <ModuleSummaryCard
          key={uuid()}
          module={module}
          onClick={selectModule}
          showPendingPayments
        />
      ))}
    </section>
  ) : (
    <Loading />
  );
};

ModulesSection.defaultProps = {
  className: null,
  showCreateCard: false,
  onCreateCardClick: () => null,
};

ModulesSection.propTypes = {
  className: PropTypes.string,
  selectModule: PropTypes.func.isRequired,
  showCreateCard: PropTypes.bool,
  onCreateCardClick: PropTypes.func,
  periodId: PropTypes.string.isRequired,
};

export default ModulesSection;
