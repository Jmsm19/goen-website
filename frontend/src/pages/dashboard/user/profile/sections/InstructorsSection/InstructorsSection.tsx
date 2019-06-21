import React from 'react';
import { useTranslation } from 'react-i18next';

import ModulesTable from '../../../../../../components/Tables/ModulesTable';
import useSenpaiModules from '../../../../../../hooks/useSenpaiModules';

import { UserPropType } from '../../../../../../lib/validation/propTypesValues';

interface Props {
  instructor: User;
}

const InstructorsSection: React.FC<Props> = ({ instructor }) => {
  const { t } = useTranslation();
  const { isSearchingModules, modules } = useSenpaiModules(instructor, 'instructor');

  return (
    <section>
      <h1>{t('Instructor')}</h1>

      <div>
        <h2>{t('Module._plural')}</h2>
        <ModulesTable modules={modules || []} loading={isSearchingModules} />
      </div>
    </section>
  );
};

InstructorsSection.propTypes = {
  instructor: UserPropType.isRequired,
};

export default InstructorsSection;
