import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import classnames from 'classnames';

import { useModules } from '../../../../store/context/ModulesContext';
import useEffectOnce from '../../../../hooks/useEffectOnce';

import ModuleSummaryCard from '../../../Cards/ModuleSummaryCard';
import ModuleCreateCard from '../../../Cards/ModuleCreateCard';

import { sortModules } from '../../../../lib/utils';
import Loading from '../../../Loading';

const PeriodDetailsModules = props => {
  const { periodId, onCardClick, className, showCreateCard, onCreateCardClick, ...rest } = props;
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
        <ModuleSummaryCard key={uuid()} module={module} onClick={onCardClick} showPendingPayments />
      ))}
    </section>
  ) : (
    <Loading />
  );
};

PeriodDetailsModules.defaultProps = {
  className: null,
  showCreateCard: false,
  onCreateCardClick: () => null,
};

PeriodDetailsModules.propTypes = {
  className: PropTypes.string,
  onCardClick: PropTypes.func.isRequired,
  showCreateCard: PropTypes.bool,
  onCreateCardClick: PropTypes.func,
  periodId: PropTypes.string.isRequired,
};

export default PeriodDetailsModules;
