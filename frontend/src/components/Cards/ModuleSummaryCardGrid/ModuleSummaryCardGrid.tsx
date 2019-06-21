import React from 'react';
import PropTypes from 'prop-types';

import Loading from '../../Loading';
import CardGrid from '../CardGrid';
import ModuleSummaryCard from '../ModuleSummaryCard';

import { ModulePropType } from '../../../lib/validation/propTypesValues';

interface Props {
  modules: Module[];
  onCardClick?: BtnClick;
  isLoading?: boolean;
}

const ModuleSummaryCardGrid: React.FC<Props> = ({ modules, onCardClick, isLoading }) => {
  if (isLoading) {
    return <Loading text='Loading modules...' />;
  }

  return (
    <CardGrid
      cardArray={modules.map(module => (
        <ModuleSummaryCard
          key={module.id}
          module={module}
          onClick={onCardClick}
          showPendingPayments={false}
          showAvailableSlots
        />
      ))}
    />
  );
};

ModuleSummaryCardGrid.defaultProps = {
  onCardClick: () => null,
  isLoading: false,
};

ModuleSummaryCardGrid.propTypes = {
  modules: PropTypes.arrayOf(ModulePropType.isRequired).isRequired,
  onCardClick: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default ModuleSummaryCardGrid;
