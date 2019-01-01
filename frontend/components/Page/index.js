import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import Header from '../Header';
import Footer from '../Footer';
import Meta from '../Meta';
import { appWithTranslation } from '../../i18n';

class Page extends Component {
  state = {};

  render() {
    const { children } = this.props;

    return (
      <Layout className="layout" style={{
        display: 'grid',
        minHeight: '100vh',
        gridTemplateRows: 'auto 1fr auto'
      }}>
        <Meta />
        <Header />
        <Layout.Content style={{ padding: '40px 50px' }}>
          {children}
        </Layout.Content>
        <Footer />
      </Layout>
    )
  }
}

Page.propTypes = {
  children: PropTypes.node.isRequired
}

export default appWithTranslation(Page);