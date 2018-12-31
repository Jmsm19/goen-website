import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NProgress from 'nprogress';
import Link from 'next/link';
import Cookies from 'js-cookie';
import Router, { withRouter } from 'next/router';
import { Layout, Menu } from 'antd';
import { withNamespaces } from '../../i18n';

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

class Header extends Component {
  constructor(props) {
    super(props);
    const { router } = props;

    this.state = {
      currentPage: router.asPath === '/' ? 'home' : router.asPath.split('/')[1],
    };
  }

  render() {
    const { currentPage } = this.state;
    const { t } = this.props;

    return (
      <Layout.Header style={{ padding: '0', height: '100%' }}>
        <Menu
          mode="horizontal"
          selectedKeys={[currentPage]}
          onClick={({ key }) =>  this.setState({
            currentPage: key
          })}>
          <Menu.Item key="home">
            <Link href="/">
              <a>{t('Home')}</a>
            </Link>
          </Menu.Item>
          {
            !(!!Cookies.get('token') && Cookies.get('token') !== 'undefined') &&
            <Menu.Item key="login">
              <Link href="/login">
                <a>{t('Login')}</a>
              </Link>
            </Menu.Item>
          }
        </Menu>
      </Layout.Header>
    )
  }
}

Header.propTypes = {
  t: PropTypes.func.isRequired,
  router: PropTypes.shape({
    asPath: PropTypes.string
  }).isRequired
}

export default withRouter(withNamespaces('common')(Header));