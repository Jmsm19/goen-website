import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { Card } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { RouteComponentProps } from 'react-router';

import useAxios from '../../hooks/useAxios';

import ActivationMessage from './ActivationMessage';
import LinkButton from '../../components/Buttons/LinkButton';

import routes from '../../lib/config/routes';
import StyledPage from './styles';

const AccountActivationPage: React.FC<RouteComponentProps> = ({ location }) => {
  const { t } = useTranslation();
  const { token } = queryString.parse(location.search);

  const [isAccountActivated, setIsAccountActivated] = useState(false);
  const [message, setMessage] = useState();

  const { isRequesting: isActivating, response } = useAxios('/auth/activate', {
    method: 'POST',
    body: { token },
  });

  useEffect(() => {
    if (!isActivating && response) {
      const { data, status } = response;
      setMessage(data.error || data.message);
      setIsAccountActivated(status === 200);
    }
  }, [response, isActivating]);

  return (
    <>
      <Helmet title={`GOEN | ${t('VerifyingAccount')}`} />

      <StyledPage className='account-activation'>
        <Card className='activation-message-card'>
          {isActivating ? (
            <h1>{t('VerifyingAccount')}</h1>
          ) : (
            <>
              <ActivationMessage
                isActivated={isAccountActivated}
                heading={isAccountActivated ? t('AccountActivated') : t('AccountActivationFailed')}
                message={message}
              />

              {isAccountActivated && (
                <LinkButton
                  to={routes.login}
                  btnProps={{
                    text: t('Login'),
                    outline: true,
                    fullWidth: true,
                    onClick: () => null,
                  }}
                />
              )}
            </>
          )}
        </Card>
      </StyledPage>
    </>
  );
};

AccountActivationPage.propTypes = {
  location: PropTypes.oneOfType([PropTypes.any]).isRequired,
};

export default AccountActivationPage;
