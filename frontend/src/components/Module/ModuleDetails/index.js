import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import StudentsTable from '../../Tables/StudentsTable';

import routes from '../../../lib/config/routes';
import { getClanImageAddress, formatHoursFromDB } from '../../../lib/utils';

import { FadeInSection } from '../../../animations/components';
import StyledContainer from './styles';

const ModuleDetails = ({ module }) => {
  const { t } = useTranslation();
  const { clan, schedule, instructor, assistant, students } = module;

  return (
    <StyledContainer>
      <FadeInSection className='module-summary-section'>
        {!!clan && <img src={getClanImageAddress(clan.name)} alt={clan.name} />}
        <div className='module-info'>
          <h1 className='module-name'>{module.fullName}</h1>
          <p className='module-schedule'>
            {t(schedule.day)} ({formatHoursFromDB(schedule.from)} -{' '}
            {formatHoursFromDB(schedule.until)})
          </p>
        </div>
      </FadeInSection>

      <FadeInSection className='senpai-section'>
        <div>
          <h2 className='senpai-section-title'>{t('Instructor._singular')}</h2>
          <p className='senpai-name'>
            <Link to={routes.dashboard.user.profile(instructor.id)}>{instructor.name}</Link>
          </p>
        </div>
        <div>
          <h2 className='senpai-section-title'>{t('Assistant._singular')}</h2>
          <p className='senpai-name'>
            <Link to={routes.dashboard.user.profile(assistant.id)}>{assistant.name}</Link>
          </p>
        </div>
      </FadeInSection>

      <FadeInSection className='students-section'>
        <h2>{t('Student._plural')}</h2>

        <StudentsTable students={students} withGradeForModule={module.id} />
      </FadeInSection>
    </StyledContainer>
  );
};

ModuleDetails.propTypes = {
  module: PropTypes.shape().isRequired,
};

export default ModuleDetails;
