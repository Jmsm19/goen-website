import React from 'react';
import { CardMedia, CardContent } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { useSettings } from '../../../store/context/SettingsContext';

import Logo from '../../../assets/images/goen-logo-big.jpg';
import LoginForm from '../../Forms/LoginForm';
import LinkButton from '../../Buttons/LinkButton';

import { SiteName } from '../../../lib/config/constants';
import routes from '../../../lib/config/routes';
import StyledCard from './styles';

const LoginFormCard = React.forwardRef((_, ref) => {
  const { t } = useTranslation();
  const { settings } = useSettings();
  const { userSignupActive } = settings;

  return (
    <StyledCard className='login-card' ref={ref}>
      <CardContent className='card-body'>
        {/* Logo */}
        <CardMedia className='card-img-top' image={Logo} title={SiteName} />

        {/* Form */}
        <LoginForm />

        {/* Go To Register Form Link */}
        {userSignupActive && (
          <LinkButton
            to={routes.register}
            className='to-register-btn'
            btnProps={{
              text: t('Register'),
              variant: 'secondary',
              outline: true,
              onClick: () => null,
            }}
          />
        )}
      </CardContent>
    </StyledCard>
  );
});

export default LoginFormCard;
