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
  StyledLogoDiv,
} from '../../styles/components/NavigationMenu';
import { InstitutionContextConsumer } from '../../context/InstitutionContext';

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
    const { toggleSidebar } = this.props;

    if (toggleSidebar) toggleSidebar();

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
          <InstitutionContextConsumer>
            {({ registrationActive }) => (
              <StyledNav>
                <StyledLogoDiv>
                  <Link href='/'>
                    <a>
                      <StyledLogo onClick={() => this.handlePageChange('')} />
                    </a>
                  </Link>
                </StyledLogoDiv>
                <StyledMenu
                  mode={isMobile ? 'inline' : 'horizontal'}
                  selectedKeys={[currentPage]}
                  onClick={({ key }) =>
                    this.handlePageChange(key, {
                      logout: handleLogout,
                    })
                  }
                >
                  {registrationActive && (
                    <Menu.Item key='module-register'>
                      <Link href='/module/register'>
                        <a>{t('ModuleRegister')}</a>
                      </Link>
                    </Menu.Item>
                  )}

                  {isAuth && authUser && (
                    <StyleSubMenu
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
          </InstitutionContextConsumer>
        )}
      </AuthContextConsumer>
    );
  }
}

NavigationMenu.defaultProps = {
  toggleSidebar: () => null,
};

NavigationMenu.propTypes = {
  t: PropTypes.func.isRequired,
  toggleSidebar: PropTypes.func,
  isMobile: PropTypes.bool.isRequired,
  router: PropTypes.shape({
    asPath: PropTypes.string,
  }).isRequired,
};

export default withRouter(withNamespaces('common')(NavigationMenu));
export const CleanNavigationMenu = NavigationMenu;
