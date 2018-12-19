import React from 'react';
import App, { Container } from 'next/app';
import Head from '../components/Head';
import i18n from '../i18n';

class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps }
  }

  render () {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Head />
        <Component {...pageProps} />
      </Container>
    )
  }
}

export default i18n.appWithTranslation(MyApp);