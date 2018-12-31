/* eslint-disable camelcase */
import React from 'react';
import App, { Container } from 'next/app';
import Cookies from 'js-cookie';
import { LocaleProvider } from 'antd';
import es_ES from 'antd/lib/locale-provider/es_ES';
import en_US from 'antd/lib/locale-provider/en_US';
import ja_JP from 'antd/lib/locale-provider/ja_JP';
import Page from '../components/Page';
import { appWithTranslation, i18n } from '../i18n';
import '../styles/nprogress.css';
import '../styles/antd.css';
import '../styles/styles.css';

class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps }
  }

  setLocale = (locale) => {
    switch (locale) {
    case 'es':
      return es_ES;
    case 'en':
      return en_US;
    case 'jpn':
      return ja_JP;
    default:
      return es_ES;
    }
  }

  render () {
    const { Component, pageProps } = this.props;
    return (
      <Container style={{ height: '100%' }}>
        <LocaleProvider locale={this.setLocale(i18n.language)}>
          <Page>
            <Component {...pageProps} />
          </Page>
        </LocaleProvider>
      </Container>
    )
  }
}

export default appWithTranslation(MyApp);