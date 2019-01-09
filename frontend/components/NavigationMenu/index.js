import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NProgress from 'nprogress';
import Link from 'next/link';
import Router, { withRouter } from 'next/router';
import { Menu, Icon } from 'antd';
import { withNamespaces } from '../../i18n';
import { AuthContextConsumer } from '../../context/AuthContext';
import {
  StyledNav,
  StyledMenu,
  StyledLogo,
  StyleSubMenu,
} from '../../styles/components/NavigationMenu';

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

class NavigationMenu extends Component {
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
        currentPage: pageKey === '' ? 'home' : pageKey,
      });
    }
  }

  render() {
    const { t, isMobile } = this.props;
    const { currentPage } = this.state;

    return (
      <AuthContextConsumer>
        {({ isAuth, authUser, handleLogout }) => (
          <StyledNav isMobile={isMobile}>
            {!isMobile && (
              <div>
                <Link href='/'>
                  <a>
                    <StyledLogo />
                  </a>
                </Link>
              </div>
            )}
            <StyledMenu
              mode={isMobile ? 'inline' : 'horizontal'}
              selectedKeys={[currentPage]}
              onClick={({ key }) =>
                this.handlePageChange(key, {
                  logout: handleLogout,
                })
              }
            >
              {isAuth && authUser && (
                <StyleSubMenu
                  isMobile={isMobile}
                  key='user'
                  title={
                    <span>
                      <Icon type='user' />
                      {isMobile ? 'User Settings' : <Icon type='caret-down' />}
                    </span>
                  }
                >
                  <Menu.Item key='profile'>
                    <Link href='/profile'>
                      <a>{t('Profile')}</a>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key='logout'>{t('Logout')}</Menu.Item>
                </StyleSubMenu>
              )}
            </StyledMenu>
          </StyledNav>
        )}
      </AuthContextConsumer>
    );
  }
}

NavigationMenu.propTypes = {
  t: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
  router: PropTypes.shape({
    asPath: PropTypes.string,
  }).isRequired,
};

export default withRouter(withNamespaces('common')(NavigationMenu));
export const CleanNavigationMenu = NavigationMenu;
