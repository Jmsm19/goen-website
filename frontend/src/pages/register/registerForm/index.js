import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { PoseGroup } from 'react-pose';
import useFormal from '@kevinwolf/formal-web';

import { useAuth } from '../../../store/context/AuthContext';

import PersonalDataSection from './personalDataSection';
import UserDataSection from './userDataSection';

import { getSignupValidationProps } from '../../../lib/validation/forms';

import { FadeInButton, FadeInContainer } from './animations';
import { StyledRegisterForm, StyledButtonArea } from './styles';

const RegisterForm = ({ t }) => {
  const { register, isRegistering } = useAuth();
  const [activeSection, setActiveSection] = useState('personal');

  const { initialValues, schema } = getSignupValidationProps(t);
  const formalConfig = { schema, onSubmit: register };
  const formal = useFormal(initialValues, formalConfig);
  const { getSubmitButtonProps, submit, errors } = formal;

  return (
    <StyledRegisterForm className='register-form'>
      <p className='form-notice'>{Object.keys(errors).length ? t('CheckForErrors') : ''}</p>

      {/* TODO: Remove SlideIn animation from sections and autofocus from national_id */}
      <PoseGroup>
        <FadeInContainer key='container'>
          {activeSection === 'personal' ? (
            <PersonalDataSection key='personal' t={t} formal={formal} />
          ) : (
            <UserDataSection key='user' t={t} formal={formal} />
          )}
        </FadeInContainer>

        {activeSection === 'personal' ? (
          <StyledButtonArea key='user-btn'>
            <FadeInButton theme='primary' onClick={() => setActiveSection('user')}>
              {t('Next')}
            </FadeInButton>
          </StyledButtonArea>
        ) : (
          <StyledButtonArea key='personal-btn'>
            <FadeInButton outline theme='light' onClick={() => setActiveSection('personal')}>
              {t('Return')}
            </FadeInButton>
            <FadeInButton
              {...getSubmitButtonProps()}
              theme='primary'
              onClick={submit}
              type='button'
            >
              {t('Register')}
            </FadeInButton>
          </StyledButtonArea>
        )}
      </PoseGroup>
    </StyledRegisterForm>
  );
};

RegisterForm.propTypes = {
  t: PropTypes.func.isRequired,
};

export default RegisterForm;
