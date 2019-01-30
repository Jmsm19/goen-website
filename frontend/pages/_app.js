import React from 'react';
import App from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';
import Page from '../components/Page';
import Meta from '../components/Meta';
import { AuthContextProvider, AuthContextConsumer } from '../context/AuthContext';
import '../styles/nprogress.css';
import '../styles/antd.css';
import '../styles/styles.css';
import { StyledContainer } from '../styles/pages/app';
import {
  InstitutionContextProvider,
  InstitutionContextConsumer,
} from '../context/InstitutionContext';

Router.onRouteChangeStart = () => NProgress.start().inc(0.5);
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

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
              {({ isAuth }) => (
                <InstitutionContextConsumer>
                  {institutionContext => (
                    <Page isAuth={isAuth}>
                      <Meta />
                      <Component
                        {...pageProps}
                        isAuth={isAuth}
                        institution={{ ...institutionContext }}
                      />
                    </Page>
                  )}
                </InstitutionContextConsumer>
              )}
            </AuthContextConsumer>
          </InstitutionContextProvider>
        </AuthContextProvider>
      </StyledContainer>
    );
  }
}

export default MyApp;
