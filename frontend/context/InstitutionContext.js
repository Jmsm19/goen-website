import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';
import { notification } from 'antd';
import { GetData, SendData } from '../utils/fetch';
import { todayIsBetween } from '../utils';

const InstitutionContext = createContext({});

class InstitutionContextProvider extends Component {
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

  confirmPayment = studentId => SendData('POST', `/student/${studentId}/confirm-payment`);

  rejectPayment = studentId => SendData('POST', `/student/${studentId}/reject-payment`);

  // eslint-disable-next-line react/sort-comp
  state = {
    currentPeriod: null,
    registrationActive: false,
    confirmPayment: this.confirmPayment,
    rejectPayment: this.rejectPayment,
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
