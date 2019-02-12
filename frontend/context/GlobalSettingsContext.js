/* eslint-disable react/sort-comp */
import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';
import { notification } from 'antd';
import { GetData, SendData } from '../utils/fetch';

const GlobalSettings = createContext({});

class GlobalSettingsProvider extends Component {
  componentDidMount() {
    this.getSettings();
  }

  toggleUpdate = callback => {
    this.setState(
      {
        updating: true,
      },
      () => {
        if (typeof callback === 'function') {
          callback();
        }
      },
    );
  };

  getSettings = () => {
    this.toggleUpdate(
      GetData('/setting')
        .then(res => res.json())
        .then(({ data }) => {
          this.setState({
            updating: false,
            settings: {
              ...data,
            },
          });
        }),
    );
  };

  updateSetting = (key, value) => {
    this.toggleUpdate(
      SendData('PUT', '/setting', { [key]: value })
        .then(res => res.json())
        .then(({ data }) => {
          this.setState({
            updating: false,
            settings: {
              ...data,
            },
          });
        }),
    );
  };

  state = {
    settings: {},
    updating: false,
    getSettings: this.getSettings,
    updateSetting: this.updateSetting,
  };

  render() {
    const { children } = this.props;

    return <GlobalSettings.Provider value={{ ...this.state }}>{children}</GlobalSettings.Provider>;
  }
}

GlobalSettingsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const GlobalSettingsConsumer = GlobalSettings.Consumer;

export { GlobalSettings, GlobalSettingsProvider, GlobalSettingsConsumer };
