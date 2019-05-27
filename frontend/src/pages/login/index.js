import React from 'react';
import Helmet from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { PoseGroup } from 'react-pose';

import { useSettings } from '../../store/context/SettingsContext';

import LoginForm from './loginForm';
import LinkButton from '../../components/Navigation/LinkButton';

import routes from '../../lib/config/routes';
import Logo from '../../assets/images/goen-logo-big.jpg';
import { StyledPage, StyledLoginCard } from './styles';

const LoginPage = props => {
  const { t } = useTranslation();
  const { settings } = useSettings();
  const { userSignupActive } = settings;

  return (
    <>
      {/* Head */}
      <Helmet title={`GOEN | ${t('Login')}`} />

      {/* Body */}
      <StyledPage className='login-page'>
        <PoseGroup animateOnMount>
          <StyledLoginCard key='login-card' className='login-card' image={Logo} fullWidth>
            <LoginForm t={t} />

            {userSignupActive && (
              <LinkButton
                to={routes.register}
                className='to-register-btn'
                btnProps={{
                  text: t('Register'),
                  type: 'secondary',
                  outline: true,
                }}
              />
            )}
          </StyledLoginCard>
        </PoseGroup>
      </StyledPage>
    </>
  );
};

LoginPage.propTypes = {};

export default LoginPage;
