import React from 'react';
import { useTranslation } from 'react-i18next';

import ModulesTable from '../../../../../../components/Tables/ModulesTable';
import useSenpaiModules from '../../../../../../hooks/useSenpaiModules';

import { UserPropType } from '../../../../../../lib/validation/propTypesValues';

interface Props {
  assistant: User;
}

const AssistantSection: React.FC<Props> = ({ assistant }) => {
  const { t } = useTranslation();
  const { isSearchingModules, modules } = useSenpaiModules(assistant, 'assistant');

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

AssistantSection.propTypes = {
  assistant: UserPropType.isRequired,
};

export default AssistantSection;
