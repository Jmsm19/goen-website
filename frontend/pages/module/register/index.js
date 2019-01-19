import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { notification } from 'antd';
import RequireAuthentication from '../../../components/RequireAuthentication';
import { GetData } from '../../../utils/fetch';
import { withNamespaces } from '../../../i18n';
import StyledPage from '../../../styles/pages/ModuleRegisterPage';
import RegistrationSteps from '../../../components/Registration/RegistrationSteps';
import ModuleSelection from '../../../components/Registration/ModuleSelection';
import PaymentProcessing from '../../../components/Registration/PaymenProcessing';
import RegisteredMessage from '../../../components/Registration/RegisteredMessage';
import { moduleOrder } from '../../../utils/config';

class ModuleRegisterPage extends Component {
  state = {
    mounted: false,
    periodData: {},
    modules: [],
  };

  static async getInitialProps() {
    return {
      namespacesRequired: ['common'],
    };
  }

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

  passedModulesArr = () => {
    const { authUser } = this.props;
    const { passedModules } = authUser;
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

  sortModules = modules => (modules ? modules.sort((a, b) => (a.name < b.name ? -1 : 1)) : []);

  filterModules = shouldFilter => {
    const { periodData } = this.state;
    const { modules } = periodData;

    if (shouldFilter) {
      return this.setState({
        modules: modules.filter(module => this.canRegisterIn(module)),
      });
    }
    return this.setState({
      modules: this.sortModules(modules),
    });
  };

  render() {
    const { t, lng, isAuth } = this.props;
    const { mounted, periodData, modules } = this.state;
    const periodName = `${periodData.name} - ${periodData.year}`;

    return (
      <RequireAuthentication t={t} isAuth={isAuth}>
        {({ authUser, setRegistrationStatus }) => {
          const { registrationStatus } = authUser;
          return (
            <StyledPage>
              <RegistrationSteps t={t} registrationStatus={registrationStatus} />
              {registrationStatus === 'idle' && (
                <ModuleSelection
                  t={t}
                  lng={lng}
                  modules={modules}
                  mounted={mounted}
                  filterModules={this.filterModules}
                  canRegisterIn={this.canRegisterIn}
                  periodName={periodName}
                  setRegistrationStatus={setRegistrationStatus}
                />
              )}

              {registrationStatus === 'paying' && <PaymentProcessing t={t} />}

              {registrationStatus === 'registered' && <RegisteredMessage t={t} />}
            </StyledPage>
          );
        }}
      </RequireAuthentication>
    );
  }
}

ModuleRegisterPage.propTypes = {
  t: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
  lng: PropTypes.string.isRequired,
  authUser: PropTypes.shape({
    passedModules: PropTypes.arrayOf(PropTypes.shape()),
  }).isRequired,
};

export default withNamespaces('common')(ModuleRegisterPage);
export const CleanModuleRegisterPage = ModuleRegisterPage;
