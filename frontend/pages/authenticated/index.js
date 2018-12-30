import React, { Component } from 'react';
import NProgress from 'nprogress';
import Cookies from 'js-cookie';
import Router from 'next/router';
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
        console.error(error);
      });
  }

  render() {
    const { isLoggedIn, message } = this.state;
    return (
      <div>
        {isLoggedIn ? (
          <>
            <h2>You are logged in</h2>
            <button type="button" onClick={this.logout}>Logout</button>
          </>
        ) : (
          <h2>{message}</h2>
        )}
      </div>
    )
  }
}


export default Authenticated;