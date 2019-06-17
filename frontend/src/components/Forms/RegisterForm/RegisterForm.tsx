import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTransition, animated } from 'react-spring';

import { useAuth } from '../../../store/context/AuthContext';

import Button from '../../UI/Button';
import UserDataSection from './UserDataSection';
import PersonalDataSection from './PersonalDataSection';

import { StyledRegisterForm, StyledButtonArea } from './styles';
import useForm from '../../../hooks/useForm';
import { RegisterFormSetup } from '../../../lib/validation';

const RegisterForm = () => {
  const { t } = useTranslation();
  const { register, isRegistering } = useAuth();
  const [activeSection, setActiveSection] = useState('personal');
  const { initialValues, validate } = RegisterFormSetup;
  const formProps = useForm(register, validate, initialValues);
  const { handleSubmit, errors } = formProps;

  const slideTransitions = useTransition(activeSection === 'personal', null, {
    initial: { opacity: 1, transform: 'translate3d(0, 0, 0)', position: 'absolute', width: '100%' },
    from: { opacity: 0, transform: 'translate3d(150%, 0, 0)', position: 'absolute', width: '100%' },
    enter: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    leave: { opacity: 0, transform: 'translate3d(150%, 0, 0)' },
  });

  const fadeTransitions = useTransition(activeSection === 'personal', null, {
    initial: { opacity: 1, position: 'absolute', width: '100%' },
    from: { opacity: 0, position: 'absolute', width: '100%' },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return (
    <StyledRegisterForm className='register-form'>
      <p className='form-notice'>{Object.keys(errors).length ? t('CheckForErrors') : ''}</p>

      <div style={{ position: 'relative' }}>
        {slideTransitions.map(trans =>
          trans.item ? (
            <animated.div key={trans.key} style={trans.props}>
              <PersonalDataSection form={formProps} />
            </animated.div>
          ) : (
            <animated.div key={trans.key} style={trans.props}>
              <UserDataSection form={formProps} />
            </animated.div>
          ),
        )}
      </div>

      <div style={{ position: 'relative' }}>
        {fadeTransitions.map(trans =>
          trans.item ? (
            <StyledButtonArea key={trans.key} style={trans.props}>
              <Button variant='primary' text={t('Next')} onClick={() => setActiveSection('user')} />
            </StyledButtonArea>
          ) : (
            <StyledButtonArea key={trans.key} style={trans.props}>
              <Button
                variant='secondary'
                text={t('Return')}
                onClick={() => setActiveSection('personal')}
              />
              <Button
                variant='primary'
                text={t('Register')}
                onClick={handleSubmit}
                isLoading={isRegistering}
              />
            </StyledButtonArea>
          ),
        )}
      </div>
    </StyledRegisterForm>
  );
};

export default RegisterForm;
