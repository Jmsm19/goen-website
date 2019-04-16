import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PoseGroup } from 'react-pose';

import LoginForm from './loginForm';
import Button from '../../components/UI/Button';

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

            <Link to='/register' className='to-register-btn'>
              <Button text={t('Register')} type='secondary' outline />
            </Link>
          </StyledLoginCard>
        </PoseGroup>
      </StyledPage>
    </>
  );
};

LoginPage.propTypes = {};

export default LoginPage;
