import React, { useContext } from 'react';
import Helmet from 'react-helmet';
import { PoseGroup } from 'react-pose';
import { useTranslation } from 'react-i18next';

import LinkButton from '../../components/Navigation/LinkButton';

import { StyledRegisterCard, StyledPage } from './styles';
import RegisterForm from './registerForm';
import { AuthContext } from '../../context/AuthContext';

import routes from '../../lib/config/routes';

const RegisterPage = props => {
  const { t } = useTranslation();
  const { signupSuccess, message } = useContext(AuthContext);

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
