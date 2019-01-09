/* eslint-disable import/no-named-as-default */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import Footer from '../Footer';
import Meta from '../Meta';
import { appWithTranslation } from '../../i18n';
import { StyledLayout, StyledContent, StyledMain } from '../../styles/components/Page';

export class Page extends Component {
  state = {};

  render() {
    const { children, isAuth } = this.props;

    return (
      /* isAuth props if removed from component by styled-components
      as it's just required for styling */
      <StyledLayout isAuth={isAuth}>
        <Meta />
        {isAuth && <Header />}
        {/* isAuth props if removed from component by styled-components */}
        <StyledMain isAuth={isAuth}>
          <StyledContent isAuth={isAuth}>{children}</StyledContent>
        </StyledMain>
        <Footer />
      </StyledLayout>
    );
  }
}

Page.propTypes = {
  children: PropTypes.node.isRequired,
  isAuth: PropTypes.bool.isRequired,
};

export default appWithTranslation(Page);
