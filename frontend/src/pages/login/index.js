import React from 'react';
import Helmet from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { PoseGroup } from 'react-pose';
import { CardBody, CardImg } from 'shards-react';

import { useSettings } from '../../store/context/SettingsContext';

import LinkButton from '../../components/Navigation/LinkButton';
import LoginForm from './loginForm';

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
          <StyledLoginCard key='login-card' className='login-card' style={{ maxWidth: 400 }}>
            <CardBody>
              <CardImg top src={Logo} style={{ width: '90%' }} />
              <LoginForm t={t} />

              {userSignupActive && (
                <LinkButton to={routes.register} theme='secondary' className='to-register-btn'>
                  {t('Register')}
                </LinkButton>
              )}
            </CardBody>
          </StyledLoginCard>
        </PoseGroup>
      </StyledPage>
    </>
  );
};

LoginPage.propTypes = {};

export default LoginPage;
