import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useModules } from '../../../../store/context/ModulesContext';

import ModulesTable from '../../../../components/Tables/ModulesTable';

import StyledPage from './styles';

const ModulesPage: React.FC = () => {
  const { t } = useTranslation();
  const { allModulesSearched, modules, getAllModules } = useModules();
  const [isSearchingModules, setIsSearchingModules] = useState(false);

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
