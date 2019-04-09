import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Collapse, Card } from 'antd';
import { compose } from 'recompose';
import { withNamespaces } from '../../../../i18n';
import ModuleCreationForm from '../../../../components/Modules/ModuleCreationForm';
import ScheduleCreationForm from '../../../../components/Schedules/ScheduleCreationForm';
import withSchedules from '../../../../components/HOCs/WithSchedules';
import RequireRole from '../../../../components/RequireRole';
import PeriodSelector from '../../../../components/Periods/PeriodSelector';
import withModulesContext from '../../../../components/HOCs/withModulesContext';
import ModulesList from '../../../../components/Lists/ModulesList';

class ModulesManagementPage extends Component {
  state = {
    modalVisible: false,
    filteredModules: null,
  };

  periodSelector = React.createRef();

  static async getInitialProps() {
    return {
      namespacesRequired: ['common'],
    };
  }

  componentDidMount() {
    const {
      modulesContext: { modules, getAllModules },
    } = this.props;

    if (!modules.length) {
      getAllModules();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      modulesContext: { modules },
    } = this.props;
    const prevModules = prevProps.modulesContext.modules;
    console.log(this.periodSelector);
    if (modules.length !== prevModules.length) {
      const periodSelector = this.periodSelector.current;
      this.filterModulesByPeriod(periodSelector.value);
    }
  }

  toggleModal = () => {
    this.setState(prevState => ({
      modalVisible: !prevState.modalVisible,
    }));
  };

  filterModulesByPeriod = periodId => {
    const {
      modulesContext: { modules },
    } = this.props;

    if (periodId) {
      const filteredModules = modules.filter(module => module.period.id === periodId);
      this.setState({
        filteredModules,
      });
    } else {
      this.setState({
        filteredModules: null,
      });
    }
  };

  render() {
    const { filteredModules, modalVisible } = this.state;
    const { t, lng, schedules, createSchedule, modulesContext, institution } = this.props;
    const { currentPeriod, addModule } = institution;
    const { modules, updateModuleList } = modulesContext;

    return (
      <RequireRole t={t} requiredRole='admin'>
        {() => (
          <main
            className='modules-page'
            style={{
              height: '100%',
              display: 'grid',
              gridTemplateRows: 'max-content max-content',
              gridGap: 10,
            }}
          >
            <Collapse>
              <Collapse.Panel header={t('Module.Create')} key={t('Module.Create')}>
                <ModuleCreationForm
                  t={t}
                  period={currentPeriod}
                  lng={lng}
                  schedules={schedules}
                  addModuleToCurrentPeriod={module => {
                    addModule(module);
                    updateModuleList(module);
                  }}
                  onPlusBtnClick={this.toggleModal}
                />
              </Collapse.Panel>
            </Collapse>

            <Modal footer={null} visible={modalVisible} onCancel={this.toggleModal}>
              <ScheduleCreationForm
                t={t}
                onSubmit={createSchedule}
                afterSubmit={this.toggleModal}
              />
            </Modal>

            <Card
              title={t('Module._plural')}
              extra={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <p style={{ margin: 0 }}>{t('FilterBy')}</p>
                  <PeriodSelector
                    t={t}
                    ref={this.periodSelector}
                    style={{ marginLeft: 10 }}
                    defaultPeriod={currentPeriod.id}
                    onChange={this.filterModulesByPeriod}
                  />
                </div>
              }
              bodyStyle={{ minHeight: '100px', overflowY: 'auto' }}
            >
              <ModulesList
                t={t}
                modules={filteredModules || modules}
                loading={modulesContext.loading}
              />
            </Card>
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
  modulesContext: PropTypes.shape({
    modules: PropTypes.arrayOf(PropTypes.shape),
    getAllModules: PropTypes.func,
    addModule: PropTypes.func,
  }).isRequired,
  institution: PropTypes.shape({
    currentPeriod: PropTypes.shape(),
    addModule: PropTypes.func,
  }).isRequired,
};

export default compose(
  withModulesContext,
  withSchedules,
)(withNamespaces('common')(ModulesManagementPage));
