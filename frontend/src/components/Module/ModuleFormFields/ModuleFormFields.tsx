import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { useInstructors } from '../../../store/context/UsersContext';
import { useModules } from '../../../store/context/ModulesContext';

import FormField from '../../Forms/FormField';
import AssistantSelector from '../../Selector/AssistantSelector';
import ClanSelector from '../../Selector/ClanSelector';
import InstructorSelector from '../../Selector/InstructorSelector';
import ModuleNameSelector from '../../Selector/ModuleNameSelector';
import ModuleSectionSelector from '../../Selector/ModuleSectionSelector';
import ScheduleSelector from '../../Selector/ScheduleSelector';

import StyledFormFields from './styles';

interface Props extends UseFormResult {
  formType?: 'update' | 'create';
}

const ModuleFormFields: React.FC<Props> = ({ handleChange, values, errors, formType }) => {
  const { t } = useTranslation();
  const { schedules, getAllSchedules } = useModules();
  const { instructors, assistants, getAllUsers } = useInstructors();

  const instructorCount = instructors.size;
  const assistantsCount = assistants.size;
  const schedulesCount = schedules.size;

  React.useEffect(() => {
    if (!instructorCount || !assistantsCount) {
      getAllUsers();
    } else if (!schedulesCount) {
      getAllSchedules();
    }
  }, [assistantsCount, getAllSchedules, getAllUsers, instructorCount, schedulesCount]);

  return (
    <StyledFormFields className='form-fields'>
      <div className='module-name'>
        <FormField help={t('Module._singular')} error={errors.name}>
          <ModuleNameSelector
            title={t('Module._singular')}
            onChange={handleChange}
            value={values.name}
            name='name'
          />
        </FormField>
        {formType === 'create' && (
          <FormField help={t('Module.Section')} error={errors.section}>
            <ModuleSectionSelector
              name='section'
              value={values.section}
              onChange={handleChange}
              title={t('Module.Section')}
              moduleName={String(values.name)}
              disabled={!values || !values.name || values.name === '--'}
            />
          </FormField>
        )}
      </div>

      <div className='module-schedule'>
        <FormField help={t('Module.Schedule')} error={errors.schedule_id}>
          <ScheduleSelector
            onChange={handleChange}
            value={values.schedule_id}
            name='schedule_id'
            title={t('Module.Schedule')}
          />
        </FormField>
      </div>

      <div className='module-clan'>
        <FormField help={`${t('Module.Clan')} - ${t('Module.OnlyForM-0')}`} error={errors.clan}>
          <ClanSelector
            onChange={handleChange}
            value={values.clan}
            name='clan'
            title={t('Module.Clan')}
            disabled={!values || (values && values.name !== 'M-0')}
          />
        </FormField>
      </div>

      <div className='instructors'>
        <FormField help={t('Instructor._singular')} error={errors.instructor_id}>
          <InstructorSelector
            onChange={handleChange}
            value={values.instructor_id}
            name='instructor_id'
            title={t('Instructor._singular')}
          />
        </FormField>

        <FormField help={t('Assistant._singular')} error={errors.assistant_id}>
          <AssistantSelector
            value={values.assistant_id}
            onChange={handleChange}
            name='assistant_id'
            title={t('Assistant._singular')}
          />
        </FormField>
      </div>
    </StyledFormFields>
  );
};

ModuleFormFields.defaultProps = {
  formType: 'create',
};

ModuleFormFields.propTypes = {
  handleChange: PropTypes.func.isRequired,
  values: PropTypes.shape({}).isRequired,
  errors: PropTypes.shape({}).isRequired,
  formType: PropTypes.oneOf(['create', 'update']),
};

export default ModuleFormFields;
