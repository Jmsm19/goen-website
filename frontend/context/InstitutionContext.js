import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';
import { GetData } from '../utils/fetch';
import { todayIsBetween } from '../utils';

const InstitutionContext = createContext({});

class InstitutionContextProvider extends Component {
  state = {
    currentPeriod: null,
    registrationActive: false,
  };

  componentDidMount() {
    this.getCurrentPeriod();
  }

  isRegistrationActiveForPeriod = ({ signupFrom, signupUntil }) =>
    todayIsBetween(signupFrom, signupUntil);

  getCurrentPeriod = () => {
    GetData('/period/current')
      .then(response => response.json())
      .then(({ data }) => {
        this.setState({
          currentPeriod: data,
          registrationActive: this.isRegistrationActiveForPeriod(data),
        });
      });
  };

  render() {
    const { children } = this.props;
    const { ...state } = this.state;

    return (
      <InstitutionContext.Provider value={{ ...state }}>{children}</InstitutionContext.Provider>
    );
  }
}

InstitutionContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const InstitutionContextConsumer = InstitutionContext.Consumer;

export { InstitutionContext, InstitutionContextProvider, InstitutionContextConsumer };
