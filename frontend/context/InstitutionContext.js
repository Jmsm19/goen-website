import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';
import { notification } from 'antd';
import { GetData, SendData } from '../utils/fetch';
import { todayIsBetween } from '../utils';
import { Loading } from '../components/Loading';

const InstitutionContext = createContext({});

class InstitutionContextProvider extends Component {
  componentDidMount() {
    this.getCurrentPeriod().then(() =>
      this.setState({
        loading: false,
      }),
    );
  }

  getPeriodList = callback => {
    this.setState(
      {
        gettingPeriods: true,
      },
      () => {
        GetData('/period')
          .then(response => response.json())
          .then(({ data, message, error }) => {
            if (message || error) {
              throw Error(message || error);
            }
            this.setState(
              {
                periodList: data,
                gettingPeriods: false,
              },
              () => (typeof callback === 'function' ? callback() : null),
            );
          })
          .catch(({ error, message }) =>
            notification.error({
              message: error || message,
            }),
          );
      },
    );
  };

  checkIfPeriodListEmpty = callback => {
    const { periodList } = this.state;
    if (periodList.length === 0) {
      return this.getPeriodList(() => callback());
    }
    return callback();
  };

  createPeriod = (values, { setSubmitting }, callback) => {
    this.checkIfPeriodListEmpty(() => {
      SendData('POST', '/period', values)
        .then(res => res.json())
        .then(({ data, message, error }) => {
          if (message || error) {
            throw Error(message || error);
          }
          if (data.active) {
            return this.setState(
              {
                currentPeriod: data,
                periodList: [data, ...this.getPeriodListWithUpdatedActivePeriod(data.id)],
              },
              () => {
                setSubmitting(false);
                if (typeof callback === 'function') {
                  callback();
                }
              },
            );
          }
          return this.setState(
            prevState => ({
              periodList: [data, ...prevState.periodList],
            }),
            () => {
              setSubmitting(false);
              if (typeof callback === 'function') {
                callback();
              }
            },
          );
        })
        .catch(({ message }) => {
          setSubmitting(false);
          notification.error({
            message,
          });
        });
    });
  };

  getPeriodListWithUpdatedActivePeriod = updatedPeriodId => {
    const { periodList } = this.state;

    const updatedPeriodList = periodList.map(period => {
      if (period.active) {
        const updatedPeriod = {
          ...period,
          active: false,
        };

        return updatedPeriod;
      }
      if (period.id === updatedPeriodId) {
        const updatedPeriod = {
          ...period,
          active: true,
        };

        return updatedPeriod;
      }
      return period;
    });

    return updatedPeriodList;
  };

  makePeriodCurrent = id =>
    this.setState(
      {
        gettingPeriods: true,
      },
      () =>
        SendData('POST', `/period/${id}/make-current`)
          .then(res => res.json())
          .then(({ data }) => {
            this.setCurrentPeriod(data);
            this.setState({
              gettingPeriods: false,
              periodList: this.getPeriodListWithUpdatedActivePeriod(id),
            });
          })
          .catch(({ error, message }) =>
            notification.error({
              message: error || message,
            }),
          ),
    );

  deletePeriod = id =>
    this.setState(
      {
        gettingPeriods: true,
      },
      () => {
        SendData('DELETE', `/period/${id}`)
          .then(res => {
            if (res.status === 204) {
              return GetData('/period')
                .then(response => response.json())
                .then(({ data }) => {
                  this.setState({
                    periodList: data,
                    gettingPeriods: false,
                  });
                })
                .catch(({ error, message }) =>
                  notification.error({
                    message: error || message,
                  }),
                );
            }
            return res.json();
          })
          .catch(({ error, message }) =>
            notification.error({
              message: error || message,
            }),
          );
      },
    );

  isRegistrationActiveForPeriod = ({ signupFrom, signupUntil }) =>
    todayIsBetween(signupFrom, signupUntil);

  getCurrentPeriod = () =>
    GetData('/period/current')
      .then(response => response.json())
      .then(({ data }) => {
        this.setState({
          currentPeriod: data,
          registrationActive: this.isRegistrationActiveForPeriod(data),
        });
      });

  setCurrentPeriod = period =>
    this.setState({
      currentPeriod: period,
    });

  confirmPayment = studentId => SendData('POST', `/student/${studentId}/confirm-payment`);

  rejectPayment = studentId => SendData('POST', `/student/${studentId}/reject-payment`);

  // eslint-disable-next-line react/sort-comp
  state = {
    loading: true,
    currentPeriod: null,
    registrationActive: false,
    setCurrentPeriod: this.setCurrentPeriod,
    confirmPayment: this.confirmPayment,
    rejectPayment: this.rejectPayment,
    makePeriodCurrent: this.makePeriodCurrent,
    deletePeriod: this.deletePeriod,
    createPeriod: this.createPeriod,
    periodList: [],
    gettingPeriods: false,
    getPeriodList: this.getPeriodList,
  };

  render() {
    const { children } = this.props;
    const { loading, ...state } = this.state;

    return !loading ? (
      <InstitutionContext.Provider value={{ ...state }}>{children}</InstitutionContext.Provider>
    ) : (
      <Loading />
    );
  }
}

InstitutionContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const InstitutionContextConsumer = InstitutionContext.Consumer;

export { InstitutionContext, InstitutionContextProvider, InstitutionContextConsumer };
