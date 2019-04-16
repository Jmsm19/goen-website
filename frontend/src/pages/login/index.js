import React from 'react';
import Helmet from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { PoseGroup } from 'react-pose';

import LoginForm from './loginForm';
import LinkButton from '../../components/Navigation/LinkButton';

import { StyledPage, StyledLoginCard } from './styles';
import Logo from '../../assets/images/goen-logo-big.jpg';

const LoginPage = props => {
  const { t } = useTranslation();

  return (
    <>
      {/* Head */}
      <Helmet>
        <title>GOEN | {t('Login')}</title>
      </Helmet>

      {/* Body */}
      <StyledPage className='login-page'>
        <PoseGroup animateOnMount>
          <StyledLoginCard key='login-card' className='login-card' image={Logo} fullWidth>
            <LoginForm t={t} />

            <LinkButton
              to='/register'
              className='to-register-btn'
              btnProps={{
                text: t('Register'),
                type: 'secondary',
                outline: true,
              }}
            />
          </StyledLoginCard>
        </PoseGroup>
      </StyledPage>
    </>
  );
};

LoginPage.propTypes = {};

export default LoginPage;
