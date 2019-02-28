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

  state = {
    modules: [],
    loading: false,
    getAllModules: this.getAllModules,
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
