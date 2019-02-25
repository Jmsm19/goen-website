import React from 'react';
import App from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';
import Page from '../components/SiteGeneral/Page';
import Meta from '../components/SiteGeneral/Meta';
import { AuthContextProvider, AuthContextConsumer } from '../context/AuthContext';
import '../styles/nprogress.less';
import '../styles/styles.less';
import { StyledContainer } from '../styles/pages/app';
import {
  InstitutionContextProvider,
  InstitutionContextConsumer,
} from '../context/InstitutionContext';
import { InstructorsContextProvider } from '../context/InstructorsContext';
import { GlobalSettingsProvider } from '../context/GlobalSettingsContext';

Router.onRouteChangeStart = () => NProgress.start().inc(0.5);
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

class MyApp extends App {
  static async getInitialProps({ Component, _, ctx }) {
    let pageProps = {};
    const nodeEnv = process.env.NODE_ENV;
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps, nodeEnv };
  }

  render() {
    const { Component, pageProps, nodeEnv } = this.props;
    return (
      <StyledContainer>
        <GlobalSettingsProvider>
          <AuthContextProvider nodeEnv={nodeEnv}>
            <InstitutionContextProvider>
              <InstructorsContextProvider>
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
              </InstructorsContextProvider>
            </InstitutionContextProvider>
          </AuthContextProvider>
        </GlobalSettingsProvider>
      </StyledContainer>
    );
  }
}

export default MyApp;
