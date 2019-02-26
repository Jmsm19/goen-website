import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router, { withRouter } from 'next/router';
import NProgress from 'nprogress';
import { notification, Icon } from 'antd';
import { GetData } from '../../utils/fetch';
import { withNamespaces } from '../../i18n';
import { StyledPage } from '../../styles/pages/ActivatePage';

export class AccountActivationPage extends Component {
  state = {
    isActivating: true,
    activationSuccess: false,
  };

  static async getInitialProps() {
    return {
      namespacesRequired: ['common'],
    };
  }

  async componentDidMount() {
    const { router, t } = this.props;
    const { query, asPath } = router;
    const token = query.tk || asPath.split('=')[1];

    try {
      NProgress.start();
      const response = await GetData(`/auth/signup/activate/${token}`);
      const { data, message } = await response.json();

      if (response.status === 200) {
        this.setState(
          () => ({
            isActivating: false,
            activationSuccess: true,
          }),
          () => {
            notification.success({
              message: t('ActivationSuccess'),
              description: `All good, ${data.name}`,
              onClose: this.goToLogin,
            });
          },
        );
      } else {
        throw Error(message);
      }
    } catch ({ message }) {
      this.setState(
        () => ({
          isActivating: false,
        }),
        () => {
          notification.error({
            message,
          });
        },
      );
    }
    NProgress.done();
  }

  goToLogin = () => {
    Router.push('/login');
  };

  render() {
    const { activationSuccess, isActivating } = this.state;
    const { t } = this.props;

    return (
      <StyledPage>
        {// eslint-disable-next-line no-nested-ternary
        isActivating ? (
          <>
            <h1>
              <Icon
                type='loading'
                spin
                style={{ color: 'var(--primary-color)', paddingRight: '30px' }}
              />
              {t('VerifyingAccount')}
            </h1>
          </>
        ) : activationSuccess ? (
          <>
            <h1>{t('AccountActivated')}</h1>
            <p>{t('Wait a moment you will be redirected to the Login page')}</p>
          </>
        ) : (
          <>
            <h1>{t('AccountActivationFailed')}</h1>
          </>
        )}
      </StyledPage>
    );
  }
}

AccountActivationPage.propTypes = {
  t: PropTypes.func.isRequired,
  router: PropTypes.shape({
    query: PropTypes.shape({
      tk: PropTypes.string,
    }),
  }).isRequired,
};

export default withNamespaces('common')(withRouter(AccountActivationPage));
