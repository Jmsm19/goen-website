import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { notification } from 'antd';
import { Loading } from '../Loading';

class ProtectedView extends Component {
  state = {
    canMount: false,
  };

  componentDidMount() {
    this.redirectIfConditionsFail();
  }

  redirectIfConditionsFail = () => {
    const { t, conditions, redirectTo, notificationMessage, notificationDescription } = this.props;

    // If one of the conditions is not met (false)
    if (conditions.includes(false)) {
      notification.error({
        message: notificationMessage || t('Unauthorized'),
        description: notificationDescription,
        duration: 6,
      });
      return this.setState(
        {
          canMount: false,
        },
        () => Router.push(redirectTo),
      );
    }

    // All conditions are met (true)
    return this.setState({
      canMount: true,
    });
  };

  render() {
    const { canMount } = this.state;
    const { children } = this.props;

    return canMount ? children : <Loading />;
  }
}

ProtectedView.defaultProps = {
  redirectTo: '/login',
  notificationMessage: '',
  notificationDescription: '',
};

ProtectedView.propTypes = {
  t: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  conditions: PropTypes.arrayOf(PropTypes.bool).isRequired,
  redirectTo: PropTypes.string,
  notificationMessage: PropTypes.string,
  notificationDescription: PropTypes.string,
};

export default ProtectedView;
