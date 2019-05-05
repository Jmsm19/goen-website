import React, { useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import ModulesTable from '../../../../components/Tables/ModulesTable';
import { DataContext } from '../../../../context/DataContext';

import StyledPage from './styles';

const ModulesPage = props => {
  const { t } = useTranslation();
  const { allModulesSearched, modules, getAllModules } = useContext(DataContext);

  useEffect(() => {
    if (!allModulesSearched) {
      getAllModules();
    }
  }, []);

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
