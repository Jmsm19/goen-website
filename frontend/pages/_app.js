import React from 'react';
import App from 'next/app';
import Page from '../components/Page';
import Meta from '../components/Meta';
import { AuthContextProvider, AuthContextConsumer } from '../context/AuthContext';
import '../styles/nprogress.css';
import '../styles/antd.css';
import '../styles/styles.css';
import { StyledContainer } from '../styles/pages/app';
import { InstitutionContextProvider } from '../context/InstitutionContext';

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
          <InstitutionContextProvider>
            <AuthContextConsumer>
              {({ isAuth, authUser }) => (
                <Page isAuth={isAuth}>
                  <Meta />
                  <Component {...pageProps} isAuth={isAuth} authUser={authUser} />
                </Page>
              )}
            </AuthContextConsumer>
          </InstitutionContextProvider>
        </AuthContextProvider>
      </StyledContainer>
    );
  }
}

export default MyApp;
