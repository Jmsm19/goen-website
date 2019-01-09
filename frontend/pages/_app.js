/* eslint-disable camelcase */
import React from 'react';
import App from 'next/app';
// eslint-disable-next-line import/no-named-as-default
import Page from '../components/Page';
import Meta from '../components/Meta';
import { AuthContextProvider, AuthContextConsumer } from '../context/AuthContext';
import '../styles/nprogress.css';
import '../styles/antd.css';
import '../styles/styles.css';
import { StyledContainer } from '../styles/pages/app';

class MyApp extends App {
  static async getInitialProps({ Component, _, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <StyledContainer>
        <AuthContextProvider>
          <AuthContextConsumer>
            {({ isAuth, authUser }) => (
              <Page isAuth={isAuth}>
                <Meta />
                <Component {...pageProps} isAuth={isAuth} />
              </Page>
            )}
          </AuthContextConsumer>
        </AuthContextProvider>
      </StyledContainer>
    );
  }
}

export default MyApp;
