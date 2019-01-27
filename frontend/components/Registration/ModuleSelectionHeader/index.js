import React from 'react';
import PropTypes from 'prop-types';
import {
  StyledHeader,
  StyledSwitch,
} from '../../../styles/components/registration/ModuleSelectionHeader';

function ModuleSelectionHeader({ filterModules, periodName, t }) {
  return (
    <StyledHeader>
      <div>
        <h1>{t('AvailableModulesForPeriod', { period: periodName })}</h1>
        <h2>{t('ChooseModule')}</h2>
      </div>
      <div>
        <StyledSwitch
          onChange={filterModules}
          checkedChildren={t('OnlyModulesForYou')}
          unCheckedChildren={t('AllModules')}
          defaultChecked
        />
      </div>
    </StyledHeader>
  );
}

ModuleSelectionHeader.propTypes = {
  filterModules: PropTypes.func.isRequired,
  periodName: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

export default ModuleSelectionHeader;
