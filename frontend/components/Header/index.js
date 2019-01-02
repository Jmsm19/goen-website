import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NProgress from 'nprogress';
import Link from 'next/link';
import Router, { withRouter } from 'next/router';
import { Layout, Menu, Icon } from 'antd';
import { withNamespaces } from '../../i18n';
import { AuthContextConsumer } from '../../context/AuthContext';

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

  handlePageChange(pageKey = null, callbacks = {}) {
    const { logout } = callbacks;

    if (pageKey === 'logout') {
      logout();
    } else {
      this.setState({
        currentPage: pageKey === '' ? 'home' : pageKey
      })
    }
  }

  render() {
    const { currentPage } = this.state;
    const { t } = this.props;
    const { SubMenu } = Menu;

    return (
      <Layout.Header style={{ padding: '0', height: '100%' }}>
        <AuthContextConsumer>
          {({ isAuth, authUser, handleLogout }) => (
            <Menu
              mode="horizontal"
              selectedKeys={[currentPage]}
              onClick={({key}) => this.handlePageChange(key, {
                logout: handleLogout
              })}>
              {/* <Menu.Item key="home">
                <Link href="/">
                  <a>{t('Home')}</a>
                </Link>
              </Menu.Item> */}
              {
                isAuth && authUser && (
                  <SubMenu key="user"
                    title={
                      <span>
                        <Icon type="user" /><span>{authUser.name}</span>
                      </span>
                    }>
                    <Menu.Item key="profile" disabled>{t('Profile')}</Menu.Item>
                    <Menu.Item key="logout">{t('Logout')}</Menu.Item>
                  </SubMenu>
                )
              }
            </Menu>
          )}
        </AuthContextConsumer>
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