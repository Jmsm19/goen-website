import React from 'react';
import App from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';
import Page from '../components/SiteGeneral/Page';
import Meta from '../components/SiteGeneral/Meta';
import { AuthContextConsumer } from '../context/AuthContext';
import { StyledContainer } from '../styles/pages/app';
import { InstitutionContextConsumer } from '../context/InstitutionContext';
import CompoundContextProvider from '../context/CompoundContextProvider';
import '../styles/nprogress.less';
import '../styles/styles.less';

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
        <CompoundContextProvider>
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
        </CompoundContextProvider>
      </StyledContainer>
    );
  }
}

export default MyApp;
