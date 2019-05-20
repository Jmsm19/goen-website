import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { useInstructors } from '../../../context/UsersContext';
import { useModules } from '../../../context/ModulesContext';

import FormField from '../../Form/Field';
import AssistantSelector from '../../Selector/AssistantSelector';
import ClanSelector from '../../Selector/ClanSelector';
import InstructorSelector from '../../Selector/InstructorSelector';
import ModuleNameSelector from '../../Selector/ModuleNameSelector';
import ModuleSectionSelector from '../../Selector/ModuleSectionSelector';
import ScheduleSelector from '../../Selector/ScheduleSelector';

import StyledFormFields from './styles';

const ModuleFormFields = ({ formalInstance, formType }) => {
  const { schedules, getAllSchedules } = useModules();
  const { instructors, assistants, getAllUsers } = useInstructors();
  const { t } = useTranslation();

  const { getFieldProps, change, values } = formalInstance;

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
        <FormField
          {...getFieldProps('name')}
          onChange={value => change('name', value)}
          name='name'
          type='select'
          title={t('Module._singular')}
          help={t('Module._singular')}
          selectComponent={ModuleNameSelector}
        />
        {formType === 'create' && (
          <FormField
            {...getFieldProps('section')}
            onChange={value => change('section', value)}
            name='section'
            type='select'
            title={t('Module.Section')}
            help={t('Module.Section')}
            selectComponent={ModuleSectionSelector}
            moduleName={values.name}
            disabled={!values || !values.name || values.name === '--'}
          />
        )}
      </div>

      <div className='module-schedule'>
        <FormField
          {...getFieldProps('schedule_id')}
          onChange={value => change('schedule_id', value)}
          name='schedule_id'
          type='select'
          title={t('Module.Schedule')}
          help={t('Module.Schedule')}
          selectComponent={ScheduleSelector}
        />
      </div>
      <div module='module-clan'>
        <FormField
          {...getFieldProps('clan')}
          onChange={value => change('clan', value)}
          name='clan'
          type='select'
          title={t('Module.Clan')}
          help={`${t('Module.Clan')} - ${t('Module.OnlyForM-0')}`}
          selectComponent={ClanSelector}
          disabled={!values || (values && values.name !== 'M-0')}
        />
      </div>
      <div className='instructors'>
        <FormField
          {...getFieldProps('instructor_id')}
          onChange={value => change('instructor_id', value)}
          name='instructor_id'
          type='select'
          title={t('Instructor._singular')}
          help={t('Instructor._singular')}
          selectComponent={InstructorSelector}
        />
        <FormField
          {...getFieldProps('assistant_id')}
          onChange={value => change('assistant_id', value)}
          name='assistant_id'
          type='select'
          title={t('Assistant._singular')}
          help={t('Assistant._singular')}
          selectComponent={AssistantSelector}
        />
      </div>
    </StyledFormFields>
  );
};

ModuleFormFields.defaultProps = {
  formType: 'create',
};

ModuleFormFields.propTypes = {
  formalInstance: PropTypes.shape({
    getFieldProps: PropTypes.func,
  }).isRequired,
  formType: PropTypes.oneOf(['create', 'update']),
};

export default ModuleFormFields;
