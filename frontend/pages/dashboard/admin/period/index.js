import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Icon } from 'antd';
import { Button } from 'antd/lib/radio';
import RequireRole from '../../../../components/RequireRole';
import { withNamespaces } from '../../../../i18n';
import PeriodCreationForm from '../../../../components/PeriodCreationForm';
import PeriodList from '../../../../components/PeriodList';
import PeriodPageHeader from '../../../../components/PeriodPageHeader';
import ModuleListCard from '../../../../components/ModuleListCard';
import PeriodUpdateForm from '../../../../components/PeriodUpdateForm';
import { ServerGetData } from '../../../../utils/fetch';
import StudentPaymentStatusCard from '../../../../components/StudentPaymentStatusCard';
import StyledPage from '../../../../styles/pages/dashboard/admin/PeriodPage';

class PeriodPage extends Component {
  state = {
    visibleCreationModal: false,
    visibleListModal: false,
    visibleUpdateModal: false,
  };

  static async getInitialProps({ req }) {
    let periodData = null;

    try {
      const response = await ServerGetData('/period/current/students', req);
      const json = await response.json();
      periodData = json.data;
    } catch (error) {
      console.log(error);
    }

    return {
      namespacesRequired: ['common'],
      students: periodData ? periodData.students : [],
    };
  }

  togglePeriodCreationModal = () => {
    this.setState(prevState => ({
      visibleCreationModal: !prevState.visibleCreationModal,
    }));
  };

  togglePeriodUpdateModal = () => {
    this.setState(prevState => ({
      visibleUpdateModal: !prevState.visibleUpdateModal,
    }));
  };

  toggleListModal = () => {
    this.setState(prevState => ({
      visibleListModal: !prevState.visibleListModal,
    }));
  };

  render() {
    const { t, institution, students } = this.props;
    const {
      getPeriodList,
      currentPeriod,
      deletePeriod,
      createPeriod,
      updatePeriod,
      makePeriodCurrent,
      gettingPeriods,
      periodList,
      confirmPayment,
      rejectPayment,
    } = institution;
    const { visibleCreationModal, visibleListModal, visibleUpdateModal } = this.state;

    return (
      <RequireRole t={t} requiredRole='admin'>
        {() => (
          <StyledPage>
            <PeriodPageHeader
              t={t}
              currentPeriod={currentPeriod}
              getPeriodList={getPeriodList}
              togglePeriodUpdateModal={this.togglePeriodUpdateModal}
              togglePeriodCreationModal={this.togglePeriodCreationModal}
              toggleListModal={this.toggleListModal}
              modules={periodList}
            />

            <Modal
              footer={null}
              visible={visibleUpdateModal}
              closable
              onCancel={this.togglePeriodUpdateModal}
            >
              <PeriodUpdateForm
                t={t}
                updatePeriod={updatePeriod}
                afterSubmit={this.togglePeriodUpdateModal}
                period={currentPeriod}
              />
            </Modal>

            <Modal
              bodyStyle={{ maxHeight: '50vh', overflowY: 'auto' }}
              title={
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{t('AvailablePeriods')}</span>
                  <Button onClick={getPeriodList} style={{ marginRight: '40px' }}>
                    <Icon type='redo' spin={gettingPeriods} />
                  </Button>
                </div>
              }
              visible={visibleListModal}
              closable
              footer={null}
              onCancel={this.toggleListModal}
            >
              <PeriodList
                list={periodList}
                loading={gettingPeriods}
                deletePeriod={deletePeriod}
                setPeriodAsCurrent={makePeriodCurrent}
              />
            </Modal>

            <Modal
              visible={visibleCreationModal}
              closable
              footer={null}
              onCancel={this.togglePeriodCreationModal}
            >
              <p>{t('PeriodCreationModuleText')}</p>

              <PeriodCreationForm
                t={t}
                togglePeriodCreationModal={this.togglePeriodCreationModal}
                createPeriod={createPeriod}
              />
            </Modal>

            <div className='row'>
              <StudentPaymentStatusCard
                t={t}
                period={currentPeriod}
                students={students}
                confirmPayment={confirmPayment}
                rejectPayment={rejectPayment}
              />

              <ModuleListCard t={t} modules={currentPeriod ? currentPeriod.modules : []} />
            </div>
          </StyledPage>
        )}
      </RequireRole>
    );
  }
}

PeriodPage.propTypes = {
  t: PropTypes.func.isRequired,
  students: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  institution: PropTypes.shape({
    getPeriodList: PropTypes.func,
    deletePeriod: PropTypes.func,
    createPeriod: PropTypes.func,
    makePeriodCurrent: PropTypes.func,
    currentPeriod: PropTypes.shape(),
    gettingPeriods: PropTypes.bool,
    periodList: PropTypes.arrayOf(PropTypes.shape()),
  }).isRequired,
};

export default withNamespaces('common')(PeriodPage);
