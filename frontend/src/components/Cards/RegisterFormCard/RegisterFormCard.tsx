import React from 'react';
import { useTranslation } from 'react-i18next';

import { CardContent } from '@material-ui/core';
import RegisterForm from '../../Forms/RegisterForm';

import routes from '../../../lib/config/routes';
import LinkButton from '../../Buttons/LinkButton';
import { useAuth } from '../../../store/context/AuthContext';

import StyledCard from './styles';

const RegisterFormCard = React.forwardRef((props, ref) => {
  const { t } = useTranslation();
  const { signupSuccess, message } = useAuth();

  return (
    <StyledCard key='register-card' className='register-card' ref={ref}>
      <CardContent className='card-body'>
        {signupSuccess ? <h1>{message}</h1> : <RegisterForm />}

        <LinkButton
          to={routes.login}
          className='to-login-btn'
          btnProps={{
            ref: null,
            text: t('Login'),
            variant: 'secondary',
            outline: true,
            onClick: () => null,
          }}
        />
      </CardContent>
    </StyledCard>
  );
});

export default RegisterFormCard;
