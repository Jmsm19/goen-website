import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { PoseGroup } from 'react-pose';
import useFormal from '@kevinwolf/formal-web';

import { AuthContext } from '../../../context/AuthContext';

import { getSignupValidationProps } from '../../../lib/validation/forms';

import {
  SlideRightPersonalSection,
  SlideLeftUserSection,
  FadeInButton,
  FadeInContainer,
} from './animations';
import { StyledRegisterForm, StyledButtonArea } from './styles';

const RegisterForm = ({ t }) => {
  const [activeSection, setActiveSection] = useState('personal');
  const { register } = useContext(AuthContext);

  const { initialValues, schema } = getSignupValidationProps(t);
  const formalConfig = { schema, onSubmit: register };
  const formal = useFormal(initialValues, formalConfig);
  const { getSubmitButtonProps, submit, errors } = formal;

  return (
    <StyledRegisterForm className='register-form'>
      <p className='form-notice'>{Object.keys(errors).length ? t('CheckForErrors') : ''}</p>

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
