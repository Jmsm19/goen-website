import React, { Component } from 'react';
import NProgress from 'nprogress';
import Cookies from 'js-cookie';
import Router from 'next/router';
import { Alert, Button, notification } from 'antd';
import { Link } from 'next-i18next/dist/components';
import { GetData } from '../../utils/fetch';

export class Authenticated extends Component {
  state = {
    isLoggedIn: !!Cookies.get('token') && Cookies.get('token') !== 'undefined',
    message: '',
  }

  componentDidMount() {
    const { isLoggedIn } = this.state;
    if (!isLoggedIn) {
      Router.push('/login');
    }
  }

  goToLogin = () => {
    Router.push('/login');
  }

  logout = () => {
    NProgress.start();
    GetData('/auth/logout')
      .then(data => data.json())
      .then(({message}) => {
        NProgress.done();
        Cookies.remove('token');
        this.setState({
          isLoggedIn: false,
          message
        })
      })
      .catch(error => {
        NProgress.done();
        notification.error({
          message: 'Error',
          description: error.message,
        });
      });
  }

  render() {
    const { isLoggedIn, message } = this.state;
    return (
      <div>
        {isLoggedIn ? (
          <>
          <Alert
            type="success"
            message="You are logged in... Sort of."
            description="Page under construction"
          />

          <div style={{ marginTop: '30px' }}>
            <Button type="default" onClick={this.logout}>Logout</Button>
          </div>
          </>
        ) : (
          message && (
            <>
            <Alert
              closable
              type="success"
              message={message}
              description="Close to go to login"
              afterClose={this.goToLogin} />
            </>
          )
        )}
      </div>
    )
  }
}


export default Authenticated;