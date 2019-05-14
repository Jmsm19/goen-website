import React from 'react';
import Helmet from 'react-helmet';
import { Redirect } from 'react-router-dom';
import { PoseGroup } from 'react-pose';
import { useTranslation } from 'react-i18next';

import useAuthContext from '../../hooks/useAuthContext';
import useSettingDataContext from '../../hooks/useSettingDataContext';

import RegisterForm from './registerForm';
import LinkButton from '../../components/Navigation/LinkButton';

import routes from '../../lib/config/routes';
import { StyledRegisterCard, StyledPage } from './styles';

const RegisterPage = props => {
  const { t } = useTranslation();
  const { signupSuccess, message } = useAuthContext();
  const { settings } = useSettingDataContext();
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
        <PoseGroup animateOnMount>
          <StyledRegisterCard key='register-card' className='register-card' fullWidth>
            {signupSuccess ? <h1>{message}</h1> : <RegisterForm t={t} />}

            <LinkButton
              to={routes.login}
              className='to-login-btn'
              btnProps={{
                text: t('Login'),
                type: 'secondary',
                outline: true,
              }}
            />
          </StyledRegisterCard>
        </PoseGroup>
      </StyledPage>
    </>
  );
};

RegisterPage.propTypes = {};

export default RegisterPage;
