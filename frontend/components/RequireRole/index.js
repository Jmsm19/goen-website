import React from 'react';
import PropTypes from 'prop-types';
import ProtectedView from '../ProtectedView';
import { AuthContextConsumer } from '../../context/AuthContext';
import { Loading } from '../SiteGeneral/Loading';

const RequireRole = ({ children, t, requiredRole }) => (
  <AuthContextConsumer>
    {context => {
      const { isAuth, authUser } = context;
      let hasRequiredRole = false;
      let notificationMessage = '';

      if (authUser) {
        switch (requiredRole) {
          case 'admin': {
            notificationMessage = t('NotAdmin');
            hasRequiredRole = authUser.isAdmin;
            break;
          }
          case 'instructor': {
            notificationMessage = t('NotInstructor');
            hasRequiredRole = authUser.isInstructor;
            break;
          }
          case 'assistant': {
            notificationMessage = t('NotAssistant');
            hasRequiredRole = authUser.isAssistant;
            break;
          }
          case 'student': {
            notificationMessage = t('NotStudent');
            hasRequiredRole = authUser.isStudent;
            break;
          }
          default:
            break;
        }
      }

      return (
        <ProtectedView
          t={t}
          conditions={[isAuth, hasRequiredRole]}
          notificationMessage={notificationMessage}
        >
          {context.authUser ? (
            children({
              ...context,
            })
          ) : (
            <Loading />
          )}
        </ProtectedView>
      );
    }}
  </AuthContextConsumer>
);

RequireRole.propTypes = {
  requiredRole: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default RequireRole;
