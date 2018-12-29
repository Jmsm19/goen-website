import React from 'react';
import PropTypes from 'prop-types';
import NProgress from 'nprogress';
import Router from 'next/router';
import { withNamespaces, Link } from '../../i18n';

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

const Header = ({ t }) => (
  <div>
    <nav>
      <Link href="/">
        <a>{t('Home')}</a>
      </Link>
      <br />
      <Link href="/login">
        <a>{t('Login')}</a>
      </Link>
      <br />
      <Link href="/register">
        <a>{t('Register')}</a>
      </Link>
    </nav>
  </div>
)

Header.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withNamespaces('common')(Header);