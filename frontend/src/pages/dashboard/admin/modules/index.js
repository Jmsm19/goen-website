import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import ModulesTable from '../../../../components/Tables/ModulesTable';
import useModuleDataContext from '../../../../hooks/useModuleDataContext';

import StyledPage from './styles';

const ModulesPage = props => {
  const { t } = useTranslation();
  const [isSearchingModules, setIsSearchingModules] = useState(false);
  const { allModulesSearched, modules, getAllModules } = useModuleDataContext();

  useEffect(() => {
    if (!isSearchingModules && !allModulesSearched) {
      setIsSearchingModules(true);
      getAllModules();
    } else if (isSearchingModules && allModulesSearched) {
      setIsSearchingModules(false);
    }
  }, [allModulesSearched, getAllModules, isSearchingModules]);

  return (
    <StyledPage>
      <h1>{t('Module._plural')}</h1>

      <section>
        <ModulesTable modules={[...modules.values()]} loading={!allModulesSearched} />
      </section>
    </StyledPage>
  );
};

ModulesPage.propTypes = {};

export default ModulesPage;
