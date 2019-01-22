import React from 'react';
import PropTypes from 'prop-types';
import ProtectedView from '../ProtectedView';
import { AuthContextConsumer } from '../../context/AuthContext';
import { Loading } from '../Loading';

const RequireStudentRole = ({ children, t }) => (
  <AuthContextConsumer>
    {context => {
      const { isAuth, authUser } = context;
      const isStudent = authUser ? authUser.isStudent : false;
      return (
        <ProtectedView t={t} conditions={[isAuth, isStudent]} notificationMessage={t('NotStudent')}>
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

RequireStudentRole.propTypes = {
  children: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default RequireStudentRole;
