import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withNamespaces } from '../../../../../i18n';
import withPageRouter from '../../../../../components/HOCs/withPageRouter';
import RequireRole from '../../../../../components/RequireRole';
import withModulesContext from '../../../../../components/HOCs/withModulesContext';
import { GetData } from '../../../../../utils/fetch';
import { notifyError } from '../../../../../utils';
import ModuleDetails from '../../../../../components/Modules/ModuleDetails';

class ShowModuleDetail extends Component {
  state = {
    module: null,
    loadingStudents: false,
    students: [],
  };

  static async getInitialProps() {
    return {
      namespacesRequired: ['common'],
    };
  }

  componentDidMount() {
    const {
      router: { query },
      modulesContext: { modules },
    } = this.props;
    const moduleId = parseInt(query.id, 10);

    if (!modules.length) {
      GetData(`/module/${moduleId}`)
        .then(res => res.json())
        .then(({ data, error }) => {
          if (error) {
            throw Error(error);
          }

          this.setState({
            module: {
              ...data,
            },
          });
          this.getStudents(data.id);
        })
        .catch(error => {
          notifyError(error);
          this.setState({
            module: 'Not found',
          });
        });
    } else {
      const module = modules.find(mod => mod.id === moduleId);

      if (!module) {
        this.setState({
          module: 'Not found',
        });
      } else {
        this.setState({
          module,
        });
        this.getStudents(module.id);
      }
    }
  }

  getStudents = moduleId => {
    this.setState(
      {
        loadingStudents: true,
      },
      () => {
        GetData(`/module/${moduleId}/students`)
          .then(res => res.json())
          .then(({ data }) => {
            this.setState({
              loadingStudents: false,
              students: [...data],
            });
          })
          .catch(error => {
            notifyError(error);
            this.setState({
              loadingStudents: false,
            });
          });
      },
    );
  };

  render() {
    const { t } = this.props;
    const { module, loadingStudents, students } = this.state;

    return (
      <RequireRole t={t} requiredRole='admin'>
        {() => (
          <ModuleDetails
            t={t}
            module={module}
            students={students}
            loadingStudents={loadingStudents}
          />
        )}
      </RequireRole>
    );
  }
}

ShowModuleDetail.propTypes = {
  t: PropTypes.func.isRequired,
  router: PropTypes.shape().isRequired,
  modulesContext: PropTypes.shape({
    modules: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
      }),
    ).isRequired,
  }).isRequired,
};

export default compose(
  withPageRouter,
  withModulesContext,
)(withNamespaces('common')(ShowModuleDetail));
