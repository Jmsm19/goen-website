import React from 'react';
import Helmet from 'react-helmet';
import { Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useSettings } from '../../store/context/SettingsContext';

import SpringAnimation from '../../components/Animations/SpringAnimation';
import RegisterFormCard from '../../components/Cards/RegisterFormCard/RegisterFormCard';

import routes from '../../lib/config/routes';
import StyledPage from './styles';

const RegisterPage = () => {
  const { t } = useTranslation();
  const { settings } = useSettings();
  const { userSignupActive } = settings;

  if (!userSignupActive) {
    return <Redirect to={routes.login} />;
  }

  return (
    <>
      {/* Head */}
      <Helmet title={`GOEN | ${t('Register')}`} />

      {/* Body */}
      <StyledPage className='register-page'>
        <SpringAnimation animation='slideUp'>
          <RegisterFormCard />
        </SpringAnimation>
      </StyledPage>
    </>
  );
};

export default RegisterPage;
