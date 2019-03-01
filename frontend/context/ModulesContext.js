/* eslint-disable react/sort-comp */
import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';
import { GetData } from '../utils/fetch';
import { sortModules, notifyError } from '../utils';

const ModulesContext = createContext({});

class ModulesContextProvider extends Component {
  getAllModules = () => {
    this.setState(
      {
        loading: true,
      },
      () => {
        GetData('/module')
          .then(res => res.json())
          .then(({ data, error }) => {
            if (error) {
              throw Error(error);
            }

            const sortedModules = sortModules(data, true);

            this.setState({
              modules: sortedModules,
              loading: false,
            });
          })
          .catch(notifyError);
      },
    );
  };

  addModule = module => {
    this.setState(prevState => {
      let updatedModules = [...prevState.modules];
      updatedModules.push(module);
      updatedModules = sortModules(updatedModules, true);
      return {
        modules: updatedModules,
      };
    });
  };

  state = {
    modules: [],
    loading: false,
    getAllModules: this.getAllModules,
    updateModuleList: this.addModule,
  };

  render() {
    const { children } = this.props;

    return <ModulesContext.Provider value={{ ...this.state }}>{children}</ModulesContext.Provider>;
  }
}

ModulesContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const ModulesContextConsumer = ModulesContext.Consumer;

export { ModulesContext, ModulesContextProvider, ModulesContextConsumer };
