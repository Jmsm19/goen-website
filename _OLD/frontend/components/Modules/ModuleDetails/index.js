import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Modal, notification } from 'antd';
import { hidden } from 'ansi-colors';
import Loading from '../../SiteGeneral/Loading';
import { formatHoursFromDB, notifyError } from '../../../utils';
import StudentList from '../../Lists/StudentList';
import DualColumnCard from '../../Cards/DualColumnCard';
import InstructorsList from '../../Lists/InstructorsList';
import { SendData } from '../../../utils/fetch';

class ModuleDetails extends Component {
  state = {
    instructorModalVisible: false,
    updatedModule: null,
  };

  toggleInstructorModal = () => {
    this.setState(prevState => ({
      instructorModalVisible: !prevState.instructorModalVisible,
    }));
  };

  assignInstructor = (instructorId, moduleId) => {
    const { t } = this.props;
    SendData('PUT', `/module/${moduleId}`, { instructor_id: instructorId })
      .then(res => res.json())
      .then(({ errors, data }) => {
        if (errors) {
          throw Error(errors.instructor_id[0]);
        }

        this.setState(
          {
            updatedModule: data,
          },
          () => {
            this.toggleInstructorModal();
            notification.success({
              message: t('Module.InstructorAssigned'),
            });
          },
        );
      })
      .catch(notifyError);
  };

  removeInstructor = moduleId => {
    const { t } = this.props;
    SendData('PUT', `/module/${moduleId}`, { instructor_id: null })
      .then(res => res.json())
      .then(({ errors, data }) => {
        if (errors) {
          throw Error(errors.instructor_id[0]);
        }

        this.setState(
          {
            updatedModule: data,
          },
          () => {
            notification.success({
              message: t('Module.InstructorRemoved'),
            });
          },
        );
      })
      .catch(notifyError);
  };

  render() {
    const { instructorModalVisible, updatedModule } = this.state;
    const { t, students, loadingStudents } = this.props;
    let { module } = this.props;

    if (!module) {
      return <Loading />;
    }

    if (module === 'Not found') {
      return (
        <div>
          <h1>{t('NoModule')}</h1>
        </div>
      );
    }

    if (updatedModule) {
      module = updatedModule;
    }
    const { schedule, instructor } = module;

    return (
      <div style={{ display: 'grid', gridGap: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr max-content', gridGap: 10 }}>
          <DualColumnCard
            /* Clan image, if any */
            firstColumn={
              module.clan && (
                <img
                  src={`/static/images/clans/${module.clan.toLowerCase()}.png`}
                  alt={module.clan}
                />
              )
            }
            /* Module meta */
            secondColumn={
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  height: '100%',
                  alignContent: 'center',
                }}
              >
                <div style={{ overflowX: 'hidden' }}>
                  <h1>
                    {module.name} {module.section}
                  </h1>
                  {/* Schedule */}
                  <h3>
                    {t(schedule.day)} {formatHoursFromDB(schedule.from)} -{' '}
                    {formatHoursFromDB(schedule.until)}
                  </h3>
                </div>
              </div>
            }
          />

          <DualColumnCard
            firstColumn={
              instructor && (
                <div style={{ paddingLeft: 20 }}>
                  <img
                    src={`/static/images/clans/${instructor.clan.toLowerCase()}.png`}
                    alt={module.clan}
                  />
                </div>
              )
            }
            secondColumn={
              instructor ? (
                <div>
                  <h2>{t('Instructor')}</h2>
                  <h3>{instructor.name}</h3>
                  <button type='button' onClick={() => this.removeInstructor(module.id)}>
                    {t('Remove')}
                  </button>
                </div>
              ) : (
                <Button
                  type='dashed'
                  onClick={this.toggleInstructorModal}
                  style={{
                    height: '100%',
                    borderColor: 'var(--primary-color)',
                    color: 'var(--primary-color)',
                  }}
                >
                  {t('AssignInstructor')}
                </Button>
              )
            }
            secondColStyle={!instructor ? { padding: 0 } : {}}
          />
        </div>

        {/* Student list */}
        <Card title={t('Students')}>
          <StudentList t={t} students={students} loading={loadingStudents} />
        </Card>

        {/* Instructors List */}
        <Modal
          closable={false}
          title={t('Instructors')}
          visible={instructorModalVisible}
          onCancel={this.toggleInstructorModal}
          footer={false}
        >
          <InstructorsList
            t={t}
            onListItemClick={instructorId => this.assignInstructor(instructorId, module.id)}
          />
        </Modal>
      </div>
    );
  }
}

ModuleDetails.defaultProps = {
  module: undefined,
  students: [],
  loadingStudents: false,
};

ModuleDetails.propTypes = {
  t: PropTypes.func.isRequired,
  students: PropTypes.arrayOf(PropTypes.shape()),
  loadingStudents: PropTypes.bool,
  module: PropTypes.shape({
    name: PropTypes.string,
    section: PropTypes.string,
  }),
};

export default ModuleDetails;
