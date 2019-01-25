/* eslint-disable import/no-named-as-default */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { appWithTranslation } from '../../i18n';
import enquireScreen from '../../utils/enquire';
import DesktopLayout from '../Layouts/DesktopLayout';
import MobileLayout from '../Layouts/MobileLayout';

class Page extends Component {
  state = {
    isMobile: false,
  };

  componentDidMount() {
    enquireScreen(isMobile => {
      this.setState({
        isMobile,
      });
    });
  }

  render() {
    const { isMobile } = this.state;
    const { children, isAuth } = this.props;

    return isMobile ? (
      <MobileLayout isMobile={isMobile} isAuth={isAuth}>
        {children}
      </MobileLayout>
    ) : (
      <DesktopLayout isMobile={isMobile} isAuth={isAuth}>
        {children}
      </DesktopLayout>
    );
  }
}

Page.propTypes = {
  children: PropTypes.node.isRequired,
  isAuth: PropTypes.bool.isRequired,
};

export default appWithTranslation(Page);
export const CleanPage = Page;
