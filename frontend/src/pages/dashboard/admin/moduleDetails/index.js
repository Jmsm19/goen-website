import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import Loading from '../../../../components/Loading';
import StudentsTable from '../../../../components/Tables/StudentsTable';

import { getClanImageAddress, formatHoursFromDB } from '../../../../lib/utils';
import { DataContext } from '../../../../context/DataContext';

import routes from '../../../../lib/config/routes';
import StyledPage from './styles';
import { FadeInSection } from '../../../../animations/components';

const ModuleDetailsPage = ({ match: { params } }) => {
  const { id } = params;
  const { modules, notFoundModules, getModule } = useContext(DataContext);
  const { t } = useTranslation();

  useEffect(() => {
    if (!modules.has(id)) {
      getModule(id);
    }
  }, []);

  if (!modules.has(id)) {
    if (notFoundModules.includes(id)) {
      return <h1>{t('Module.NotFound')}</h1>;
    }

    return <Loading text={t('Module.Searching')} />;
  }

  const module = modules.get(id);
  const { clan, schedule, instructor, assistant, students } = module;

  return (
    <StyledPage className='module-page'>
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
    </StyledPage>
  );
};

ModuleDetailsPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default ModuleDetailsPage;
