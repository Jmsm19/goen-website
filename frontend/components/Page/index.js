/* eslint-disable import/no-named-as-default */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { appWithTranslation } from '../../i18n';
import { enquireScreen, StopEnquireScreen } from '../../utils/enquire';
import DashboardLayout from '../Layouts/DashboardLayout';

class Page extends Component {
  state = {
    isMobile: false,
  };

  componentDidMount() {
    enquireScreen(isMobile => {
      this.setState({
        isMobile: Boolean(isMobile),
      });
    });
  }

  componentWillUnmount() {
    StopEnquireScreen();
  }

  render() {
    const { isMobile } = this.state;
    const { children, isAuth } = this.props;

    return (
      <DashboardLayout isMobile={isMobile} isAuth={isAuth}>
        {children}
      </DashboardLayout>
    );
  }
}

Page.propTypes = {
  children: PropTypes.node.isRequired,
  isAuth: PropTypes.bool.isRequired,
};

export default appWithTranslation(Page);
export const CleanPage = Page;
