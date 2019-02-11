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
