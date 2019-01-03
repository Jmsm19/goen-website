import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import Header from '../Header';
import Footer from '../Footer';
import Meta from '../Meta';
import { appWithTranslation } from '../../i18n';

export class Page extends Component {
  state = {};

  render() {
    const { children , isAuth } = this.props;

    return (
      <Layout className="layout" style={{
        display: 'grid',
        minHeight: '100vh',
        gridTemplateRows: isAuth ? 'auto 1fr auto' : '1fr auto',
      }}>
        <Meta />
        {
          isAuth && (
            <Header/>
          )
        }
        <Layout.Content style={{
          padding: '40px 50px',
          display: !isAuth ? 'grid' : null,
          alignItems: !isAuth ? 'center' : null
        }}>
          {children}
        </Layout.Content>
        <Footer />
      </Layout>
    )
  }
}

Page.propTypes = {
  children: PropTypes.node.isRequired,
  isAuth: PropTypes.bool.isRequired,
}

export default appWithTranslation(Page);