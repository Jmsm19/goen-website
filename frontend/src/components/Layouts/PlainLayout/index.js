import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import routes from '../../../lib/config/routes';

import LoginPage from '../../../pages/login';
import RegisterPage from '../../../pages/register';
import Footer from '../Footer';

import StyledLayout from './styles';
import { AuthContext } from '../../../context/AuthContext';
import AccountActivationPage from '../../../pages/activate';

const PlainLayout = props => {
  const { isAuth } = useContext(AuthContext);

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
