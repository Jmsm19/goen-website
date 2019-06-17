import React from 'react';
import Helmet from 'react-helmet';
import { useTranslation } from 'react-i18next';

import LoginFormCard from '../../components/Cards/LoginFormCard';

import StyledPage from './styles';
import SpringAnimation from '../../components/Animations/SpringAnimation';

const LoginPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      {/* Head */}
      <Helmet title={`GOEN | ${t('Login')}`} />

      {/* Body */}
      <StyledPage className='login-page'>
        <SpringAnimation animation='slideUp'>
          <LoginFormCard />
        </SpringAnimation>
      </StyledPage>
    </>
  );
};

export default LoginPage;
