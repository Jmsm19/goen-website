/* eslint-disable react/sort-comp */
import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';
import { notification } from 'antd';
import { capitalize } from '../utils';
import { GetData, SendData } from '../utils/fetch';

const UsersContext = createContext({});

class UsersContextProvider extends Component {
  getAllUsers = () => {
    this.setState(
      {
        gettingUsers: true,
      },
      () => {
        GetData('/user')
          .then(res => res.json())
          .then(({ data }) => {
            this.setState({
              users: data,
              gettingUsers: false,
            });
          });
      },
    );
  };

  addRole = (userId, roleName) => {
    this.setState(
      {
        gettingUsers: true,
      },
      () => {
        SendData('PUT', `/users/${userId}/${roleName}`)
          .then(res => res.json())
          .then(({ message, error }) => {
            if (error) {
              throw Error(error);
            }
            if (message) {
              const { users } = this.state;
              const updatedUsers = users.map(user => {
                if (user.id !== userId) {
                  return user;
                }
                const updatedUser = {
                  ...user,
                  [`is${capitalize(roleName)}`]: true,
                };
                return updatedUser;
              });
              return this.setState(
                {
                  gettingUsers: false,
                  users: updatedUsers,
                },
                () => {
                  notification.success({
                    message,
                  });
                },
              );
            }
            return this.setState({
              gettingUsers: false,
            });
          })
          .catch(({ error, message }) => {
            notification.error({
              message: error || message,
            });
          });
      },
    );
  };

  removeRole = (userId, roleName) => {
    this.setState(
      {
        gettingUsers: true,
      },
      () => {
        SendData('DELETE', `/users/${userId}/${roleName}`)
          .then(res => res.json())
          .then(({ message, error }) => {
            if (error) {
              throw Error(error);
            }
            if (message) {
              const { users } = this.state;
              const updatedUsers = users.map(user => {
                if (user.id !== userId) {
                  return user;
                }
                const updatedUser = {
                  ...user,
                  [`is${capitalize(roleName)}`]: false,
                };
                return updatedUser;
              });
              return this.setState(
                {
                  gettingUsers: false,
                  users: updatedUsers,
                },
                () => {
                  notification.success({
                    message,
                  });
                },
              );
            }
            return this.setState({
              gettingUsers: false,
            });
          })
          .catch(({ error, message }) => {
            notification.error({
              message: error || message,
            });
          });
      },
    );
  };

  state = {
    users: [],
    gettingUsers: false,
    getAllUsers: this.getAllUsers,
    addRole: this.addRole,
    removeRole: this.removeRole,
  };

  render() {
    const { children } = this.props;

    return <UsersContext.Provider value={{ ...this.state }}>{children}</UsersContext.Provider>;
  }
}

UsersContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const UsersContextConsumer = UsersContext.Consumer;

export { UsersContext, UsersContextProvider, UsersContextConsumer };
