/* eslint-disable camelcase */
import React from 'react';
import App, { Container } from 'next/app';
import Page from '../components/Page';
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
        <Page>
          <Component {...pageProps} />
        </Page>
      </Container>
    )
  }
}

export default MyApp;