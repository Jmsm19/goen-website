import React, { useContext } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { PoseGroup } from 'react-pose';
import { useTranslation } from 'react-i18next';

import Button from '../../components/UI/Button';

import { StyledRegisterCard, StyledPage } from './styles';
import RegisterForm from './registerForm';
import { AuthContext } from '../../context/AuthContext';

const RegisterPage = props => {
  const { t } = useTranslation();
  const { signupSuccess, message } = useContext(AuthContext);

  return (
    <>
      {/* Head */}
      <Helmet>
        <title>GOEN | {t('Register')}</title>
      </Helmet>

      {/* Body */}
      <StyledPage className='register-page'>
        <PoseGroup animateOnMount>
          <StyledRegisterCard key='register-card' className='register-card' fullWidth>
            {signupSuccess ? <h1>{message}</h1> : <RegisterForm t={t} />}

            <Link to='/' className='to-login-btn'>
              <Button text={t('Login')} type='secondary' outline />
            </Link>
          </StyledRegisterCard>
        </PoseGroup>
      </StyledPage>
    </>
  );
};

RegisterPage.propTypes = {};

export default RegisterPage;
