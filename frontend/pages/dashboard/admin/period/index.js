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

class PeriodPage extends Component {
  state = {
    visibleCreationModal: false,
    visibleListModal: false,
  };

  static async getInitialProps() {
    return {
      namespacesRequired: ['common'],
    };
  }

  togglePeriodCreationModal = () => {
    this.setState(prevState => ({
      visibleCreationModal: !prevState.visibleCreationModal,
    }));
  };

  toggleListModal = () => {
    this.setState(prevState => ({
      visibleListModal: !prevState.visibleListModal,
    }));
  };

  render() {
    const { t, institution } = this.props;
    const {
      getPeriodList,
      currentPeriod,
      deletePeriod,
      createPeriod,
      makePeriodCurrent,
      gettingPeriods,
      periodList,
    } = institution;
    const { visibleCreationModal, visibleListModal } = this.state;

    return (
      <RequireRole t={t} requiredRole='admin'>
        {() => (
          <div>
            <PeriodPageHeader
              t={t}
              currentPeriod={currentPeriod}
              getPeriodList={getPeriodList}
              togglePeriodCreationModal={this.togglePeriodCreationModal}
              toggleListModal={this.toggleListModal}
              modules={periodList}
            />

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

            <ModuleListCard t={t} modules={currentPeriod ? currentPeriod.modules : []} />
          </div>
        )}
      </RequireRole>
    );
  }
}

PeriodPage.propTypes = {
  t: PropTypes.func.isRequired,
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
