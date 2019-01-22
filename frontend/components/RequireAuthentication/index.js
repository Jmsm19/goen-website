import React from 'react';
import PropTypes from 'prop-types';
import ProtectedView from '../ProtectedView';
import { AuthContextConsumer } from '../../context/AuthContext';
import { Loading } from '../Loading';

const RequireAuthentication = ({ children, t }) => (
  <AuthContextConsumer>
    {context => (
      <ProtectedView
        t={t}
        conditions={[context.isAuth]}
        notificationMessage={t('Unauthorized')}
        notificationDescription={t('LoginFirst')}
      >
        {context.authUser ? (
          children({
            ...context,
          })
        ) : (
          <Loading />
        )}
      </ProtectedView>
    )}
  </AuthContextConsumer>
);

RequireAuthentication.propTypes = {
  t: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired,
};

export default RequireAuthentication;
