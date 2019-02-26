import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Modal } from 'antd';
import { withNamespaces } from '../../../../i18n';
import ModuleCreationForm from '../../../../components/Modules/ModuleCreationForm';
import ScheduleCreationForm from '../../../../components/Schedules/ScheduleCreationForm';
import withSchedules from '../../../../components/HOCs/WithSchedules';
import RequireRole from '../../../../components/RequireRole';

class ModulesManagementPage extends Component {
  state = {
    modalVisible: false,
  };

  static async getInitialProps() {
    return {
      namespacesRequired: ['common'],
    };
  }

  toggleModal = () => {
    this.setState(prevState => ({
      modalVisible: !prevState.modalVisible,
    }));
  };

  render() {
    const {
      t,
      lng,
      schedules,
      createSchedule,
      institution: { currentPeriod, addModule },
    } = this.props;
    const { modalVisible } = this.state;

    return (
      <RequireRole t={t} requiredRole='admin'>
        {() => (
          <main className='modules-page'>
            <Card title={t('Module.Create')}>
              <ModuleCreationForm
                t={t}
                period={currentPeriod}
                lng={lng}
                schedules={schedules}
                addModuleToCurrentPeriod={addModule}
                onPlusBtnClick={this.toggleModal}
              />
            </Card>

            <Modal footer={null} visible={modalVisible} onCancel={this.toggleModal}>
              <ScheduleCreationForm
                t={t}
                onSubmit={createSchedule}
                afterSubmit={this.toggleModal}
              />
            </Modal>
          </main>
        )}
      </RequireRole>
    );
  }
}

ModulesManagementPage.propTypes = {
  t: PropTypes.func.isRequired,
  lng: PropTypes.string.isRequired,
  schedules: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  createSchedule: PropTypes.func.isRequired,
  institution: PropTypes.shape({
    currentPeriod: PropTypes.shape(),
    addModule: PropTypes.func,
  }).isRequired,
};

export default withNamespaces('common')(withSchedules(ModulesManagementPage));
