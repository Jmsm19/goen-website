import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { useAuth } from '../../../context/AuthContext';

import LoginPage from '../../../pages/login';
import RegisterPage from '../../../pages/register';
import AccountActivationPage from '../../../pages/activate';
import Footer from '../Footer';

import routes from '../../../lib/config/routes';
import StyledLayout from './styles';

const PlainLayout = props => {
  const { isAuth } = useAuth();

  if (isAuth) {
    return <Redirect to={routes.dashboard.home} />;
  }

  return (
    <StyledLayout className='layout'>
      <main>
        <Switch>
          <Route exact path={routes.activate} component={AccountActivationPage} />
          <Route exact path={routes.register} component={RegisterPage} />
          <Route exact path={routes.login} component={LoginPage} />
        </Switch>
      </main>

      <Footer />
    </StyledLayout>
  );
};

PlainLayout.propTypes = {};

export default PlainLayout;
