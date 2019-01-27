import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Skeleton, Modal, notification } from 'antd';
import uuid from 'uuid/v4';
import { GetData, SendData } from '../../../utils/fetch';
import {
  StyledModulesGrid,
  StyledPageContent,
} from '../../../styles/components/registration/ModuleSelection';
import ModuleCard from '../../ModuleCard';
import ModuleSelectionHeader from '../ModuleSelectionHeader';
import { moduleOrder } from '../../../utils/config';
import { Loading } from '../../Loading';

class ModuleSelection extends Component {
  state = {
    mounted: false,
    periodData: {},
    modules: [],
  };

  componentDidMount() {
    GetData('/period/current')
      .then(response => response.json())
      .then(({ data, error }) => {
        if (error) throw Error(error);
        this.setState(
          () => ({
            mounted: true,
            periodData: data,
          }),
          () => this.filterModules(true),
        );
      })
      .catch(error => {
        notification.error({
          message: error.message || error.error,
        });
      });
  }

  handleModuleRegistration = moduleId => {
    const { setRegistrationStatus } = this.props;
    SendData('POST', `/module/${moduleId}/register`)
      .then(response => response.json())
      .then(({ error }) => {
        if (error) {
          throw Error(error);
        }
        setRegistrationStatus('paying');
      })
      .catch(({ error, message }) =>
        notification.error({
          message: error || message,
        }),
      );
  };

  passedModulesArr = () => {
    const { passedModules } = this.props;
    return passedModules ? passedModules.map(module => module.name) : [];
  };

  modulesWhereRegistrable = () => {
    const filteredModules = moduleOrder.filter(module => !this.passedModulesArr().includes(module));
    filteredModules.splice(1);
    return filteredModules;
  };

  /**
   * Returns true if user can register in the given module, based on module order
   * @param {Object} module
   */
  canRegisterIn = module => this.modulesWhereRegistrable().includes(module.name);

  sortModules = modulesToSort =>
    modulesToSort ? modulesToSort.sort((a, b) => (a.name < b.name ? -1 : 1)) : [];

  filterModules = shouldFilter => {
    const { modules } = this.state;

    if (shouldFilter) {
      return this.setState({
        modules: modules.filter(module => this.canRegisterIn(module)),
      });
    }
    return this.setState({
      modules: this.sortModules(modules),
    });
  };

  toggleConfirmPopFor = moduleId => {
    const { t } = this.props;
    Modal.confirm({
      title: t('ModuleRegisterConfirm'),
      width: 'max-content',
      okText: t('Yes'),
      okType: 'primary',
      centered: true,
      cancelText: t('No'),
      onOk() {
        this.handleModuleRegistration(moduleId);
      },
    });
  };

  render() {
    const { lng, t } = this.props;
    const { mounted, periodData, modules } = this.state;
    const periodName = `${periodData.name} - ${periodData.year}`;

    return (
      <Skeleton loading={!mounted} active>
        <StyledPageContent>
          <ModuleSelectionHeader t={t} periodName={periodName} filterModules={this.filterModules} />
          {mounted ? (
            <StyledModulesGrid>
              {modules &&
                modules.map(module => (
                  <ModuleCard
                    key={uuid()}
                    t={t}
                    lng={lng}
                    module={module}
                    canRegister={this.canRegisterIn(module)}
                    toggleConfirmPopFor={this.toggleConfirmPopFor}
                  />
                ))}
            </StyledModulesGrid>
          ) : (
            <Loading />
          )}
        </StyledPageContent>
      </Skeleton>
    );
  }
}

ModuleSelection.propTypes = {
  t: PropTypes.func.isRequired,
  lng: PropTypes.string.isRequired,
  passedModules: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  setRegistrationStatus: PropTypes.func.isRequired,
};

export default ModuleSelection;
