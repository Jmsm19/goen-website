import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { useTranslation } from 'react-i18next';
import { Card, CardBody } from 'shards-react';

import useAxios from '../../hooks/useAxios';

import LoadingIcon from '../../components/UI/LoadingIcon';
import LinkButton from '../../components/Navigation/LinkButton';

import StyledPage from './styles';
import ActivationMessage from './ActivationMessage';

import routes from '../../lib/config/routes';

const AccountActivationPage = ({ location }) => {
  const { t } = useTranslation();
  const { token } = queryString.parse(location.search);

  const [isAccountActivated, setIsAccountActivated] = useState(false);
  const [message, setMessage] = useState(null);

  const [isActivating, response] = useAxios('/auth/activate', {
    method: 'POST',
    body: { token },
  });

  useEffect(() => {
    if (!isActivating && response) {
      const { data, status } = response;
      setMessage(!Array.isArray(data.error) ? data.error : null || data.message);
      setIsAccountActivated(status === 200);
    }
  }, [response, isActivating]);

  return (
    <>
      <Helmet title={`GOEN | ${t('VerifyingAccount')}`} />

      <StyledPage className='account-activation'>
        <Card className='activation-message-card'>
          <CardBody>
            {isActivating ? (
              <LoadingIcon />
            ) : (
              <>
                <ActivationMessage
                  isActivated={isAccountActivated}
                  heading={
                    isAccountActivated ? t('AccountActivated') : t('AccountActivationFailed')
                  }
                  message={message}
                />

                {isAccountActivated && <LinkButton to={routes.login} />}
              </>
            )}
          </CardBody>
        </Card>
      </StyledPage>
    </>
  );
};

AccountActivationPage.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
};

export default AccountActivationPage;
