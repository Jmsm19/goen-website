import React from 'react';
import NextHead from 'next/head';
import NProgress from 'nprogress';
import Router from 'next/router'
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

const Head = () => (
  <NextHead>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charSet="utf-8" />
    <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
    <link rel="manifest" href="/static/manifest.webmanifest" />
    <title>{publicRuntimeConfig.SITE_NAME}</title>
  </NextHead>
)

export default Head;