import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NProgress from 'nprogress';
import Link from 'next/link';
import Router, { withRouter } from 'next/router';
import { Layout, Menu, Icon } from 'antd';
import { withNamespaces } from '../../i18n';
import { AuthContextConsumer } from '../../context/AuthContext';
import { StyledNav, StyledMenu, StyledLogo } from '../../styles/components/Header';

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

export class Header extends Component {
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
      <header>
        <Layout.Header style={{ padding: '0', height: '100%' }}>
          <AuthContextConsumer>
            {({ isAuth, authUser, handleLogout }) => (
              <StyledNav>
                <div>
                  <Link href="/">
                    <a><StyledLogo /></a>
                  </Link>
                </div>
                <StyledMenu
                  mode="horizontal"
                  selectedKeys={[currentPage]}
                  onClick={({key}) => this.handlePageChange(key, {
                    logout: handleLogout
                  })}>
                  {
                    isAuth && authUser && (
                      <SubMenu key="user"
                        style={{ display: 'inline-block', marginLeft: 'auto' }}
                        title={
                          <span>
                            <Icon type="user" /><Icon type="caret-down" />
                          </span>
                        }>
                        <Menu.Item key="profile">
                          <Link href="/profile" >
                            <a>{t('Profile')}</a>
                          </Link>
                        </Menu.Item>
                        <Menu.Item key="logout">{t('Logout')}</Menu.Item>
                      </SubMenu>
                    )
                  }
                </StyledMenu>
              </StyledNav>
            )}
          </AuthContextConsumer>
        </Layout.Header>
      </header>
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