/* eslint-disable react/sort-comp */
import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';
import { notification } from 'antd';
import { GetData, SendData } from '../utils/fetch';

const InstructorsContext = createContext({});

class InstructorsContextProvider extends Component {
  getAllInstructors = () => {
    this.setState(
      {
        loading: true,
      },
      () => {
        GetData('/instructor')
          .then(res => res.json())
          .then(({ data }) => {
            this.setState({
              instructors: data,
              loading: false,
            });
          });
      },
    );
  };

  addRole = (userId, callback) => {
    this.setState(
      {
        loading: true,
      },
      () => {
        SendData('PUT', `/instructor/add/${userId}`)
          .then(res => res.json())
          .then(({ message, error, instructor }) => {
            if (error) {
              throw Error(error);
            }
            if (message) {
              return this.setState(
                prevState => ({
                  loading: false,
                  instructors: [...prevState.instructors, instructor],
                }),
                () => {
                  notification.success({
                    message,
                  });
                  if (typeof callback === 'function') {
                    callback();
                  }
                },
              );
            }

            return this.setState({
              loading: false,
            });
          })
          .catch(({ error, message }) => {
            this.setState({
              loading: false,
            });
            notification.error({
              message: error || message,
            });
          });
      },
    );
  };

  removeRole = (userId, roleName, callback) => {
    this.setState(
      {
        loading: true,
      },
      () => {
        SendData('DELETE', `/users/${userId}/${roleName}`)
          .then(res => res.json())
          .then(({ message, error }) => {
            if (error) {
              throw Error(error);
            }
            if (message) {
              const { instructors } = this.state;
              const updatedUsers = instructors.filter(user => user.id !== userId);
              return this.setState(
                {
                  loading: false,
                  instructors: updatedUsers,
                },
                () => {
                  notification.success({
                    message,
                  });
                  if (typeof callback === 'function') {
                    callback();
                  }
                },
              );
            }
            return this.setState({
              loading: false,
            });
          })
          .catch(({ error, message }) => {
            this.setState({
              loading: false,
            });
            notification.error({
              message: error || message,
            });
          });
      },
    );
  };

  state = {
    instructors: [],
    loading: false,
    getAllInstructors: this.getAllInstructors,
    addRole: this.addRole,
    removeRole: this.removeRole,
  };

  render() {
    const { children } = this.props;

    return (
      <InstructorsContext.Provider value={{ ...this.state }}>
        {children}
      </InstructorsContext.Provider>
    );
  }
}

InstructorsContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const InstructorsContextConsumer = InstructorsContext.Consumer;

export { InstructorsContext, InstructorsContextProvider, InstructorsContextConsumer };
