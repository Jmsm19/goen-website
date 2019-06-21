import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useModules } from '../../../store/context/ModulesContext';

import StudentsTable from '../../Tables/StudentsTable';
import UpdatesButtonArea from '../../Buttons/UpdatesButtonArea';
import ConfirmationModal from '../../Modals/ConfirmationModal';
import UpdateModuleModal from '../../Modals/UpdateModuleModal';

import routes from '../../../lib/config/routes';
import { getClanImageAddress, formatHoursFromDB } from '../../../lib/utils';
import { ModulePropType } from '../../../lib/validation/propTypesValues';
import StyledContainer from './styles';
import SpringAnimation from '../../Animations/SpringAnimation';

interface Props {
  module: Module;
  deselectModule: Function;
}

const ModuleDetails: React.FC<Props> = ({ module, deselectModule }) => {
  const { t } = useTranslation();
  const { deleteModule, students } = useModules();

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [isEditingModule, setIsEditingModule] = useState(false);

  const { clan, schedule, instructor, assistant } = module;
  const moduleStudents = students.get(module.id) || [];

  return (
    <>
      <StyledContainer>
        <section className='module-summary-section'>
          <SpringAnimation animation='fadeIn'>
            {!!clan && <img src={getClanImageAddress(clan.name)} alt={clan.name} />}
            <div className='module-info'>
              {/* <h1 className='module-name'>{module.fullName}</h1> */}
              <p className='module-schedule'>
                {t(schedule.day)} ({formatHoursFromDB(schedule.from)} -{' '}
                {formatHoursFromDB(schedule.until)})
              </p>
              <UpdatesButtonArea
                onEditClick={() => setIsEditingModule(true)}
                onDeleteClick={() => setShowConfirmationModal(true)}
              />
            </div>
          </SpringAnimation>
        </section>

        <section className='senpai-section'>
          <SpringAnimation animation='fadeIn'>
            {!!instructor && (
              <div>
                <h2 className='senpai-section-title'>{t('Instructor._singular')}</h2>
                <p className='senpai-name'>
                  <Link to={routes.dashboard.user.profile(instructor.id)}>{instructor.name}</Link>
                </p>
              </div>
            )}
            {!!assistant && (
              <div>
                <h2 className='senpai-section-title'>{t('Assistant._singular')}</h2>
                <p className='senpai-name'>
                  <Link to={routes.dashboard.user.profile(assistant.id)}>{assistant.name}</Link>
                </p>
              </div>
            )}
          </SpringAnimation>
        </section>

        <section className='students-section'>
          <SpringAnimation animation='fadeIn'>
            <h2>{t('Student._plural')}</h2>

            <StudentsTable students={moduleStudents} withGrade moduleId={module.id} />
          </SpringAnimation>
        </section>
      </StyledContainer>

      {/* Modals */}
      <ConfirmationModal
        isVisible={showConfirmationModal}
        onAccept={() =>
          deleteModule(module.id, [() => setShowConfirmationModal(false), deselectModule])
        }
        onCancel={() => setShowConfirmationModal(false)}
      />
      <UpdateModuleModal
        module={module}
        isVisible={isEditingModule}
        onClose={() => setIsEditingModule(false)}
      />
    </>
  );
};

ModuleDetails.propTypes = {
  module: ModulePropType.isRequired,
  deselectModule: PropTypes.func.isRequired,
};

export default ModuleDetails;
