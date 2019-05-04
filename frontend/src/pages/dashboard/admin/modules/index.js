import React, { useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import ModulesTable from '../../../../components/Tables/ModulesTable';
import { DataContext } from '../../../../context/DataContext';

const ModulesPage = props => {
  const { t } = useTranslation();
  const { allModulesSearched, modules, getAllModules } = useContext(DataContext);

  useEffect(() => {
    if (!allModulesSearched) {
      getAllModules();
    }
  }, []);

  return (
    <div>
      <h1>{t('Module._plural')}</h1>

      <ModulesTable modules={[...modules.values()]} loading={!allModulesSearched} />
    </div>
  );
};

ModulesPage.propTypes = {};

export default ModulesPage;
