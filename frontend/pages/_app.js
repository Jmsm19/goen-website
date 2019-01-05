/* eslint-disable camelcase */
import React from 'react';
import App, { Container } from 'next/app';
import Page from '../components/Page';
import { AuthContextProvider, AuthContextConsumer } from '../context/AuthContext';
import '../styles/nprogress.css';
import '../styles/antd.css';
import '../styles/styles.css';

class MyApp extends App {
  static async getInitialProps({ Component, _, ctx }) {
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps }
  }

  render () {
    const { Component, pageProps } = this.props;
    return (
      <Container style={{ height: '100%' }}>
        <AuthContextProvider>
          <AuthContextConsumer>
            {({ isAuth, authUser }) => (
              <Page isAuth={isAuth}>
                <Component {...pageProps} isAuth={isAuth} />
              </Page>
            )}
          </AuthContextConsumer>
        </AuthContextProvider>
      </Container>
    )
  }
}

export default MyApp;