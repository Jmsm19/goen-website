import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { PoseGroup } from 'react-pose';
import useFormal from '@kevinwolf/formal-web';

import { useAuth } from '../../../context/AuthContext';

import { getSignupValidationProps } from '../../../lib/validation/forms';

import {
  SlideRightPersonalSection,
  SlideLeftUserSection,
  FadeInButton,
  FadeInContainer,
} from './animations';
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
            <SlideRightPersonalSection key='personal' t={t} formal={formal} />
          ) : (
            <SlideLeftUserSection key='user' t={t} formal={formal} />
          )}
        </FadeInContainer>

        {activeSection === 'personal' ? (
          <StyledButtonArea key='user-btn'>
            <FadeInButton
              type='primary'
              text={t('Next')}
              onClick={() => setActiveSection('user')}
            />
          </StyledButtonArea>
        ) : (
          <StyledButtonArea key='personal-btn'>
            <FadeInButton
              type='secondary'
              text={t('Return')}
              onClick={() => setActiveSection('personal')}
            />
            <FadeInButton
              {...getSubmitButtonProps()}
              type='primary'
              text={t('Register')}
              onClick={submit}
              isLoading={isRegistering}
            />
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
