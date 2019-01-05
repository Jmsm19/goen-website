import React from 'react';
import Head from 'next/head';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const Meta = () => (
  <Head>
    {/* Common metas */}
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charSet="utf-8" />
    <meta description="GOEN Maracaibo" />
    {/* Icons */}
    <link rel="apple-touch-icon" sizes="180x180" href="/static/icons/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/static/icons/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/static/icons/favicon-16x16.png" />
    <link rel="mask-icon" href="/static/icons/safari-pinned-tab.svg" color="#5bbad5" />
    {/* App related meta tags */}
    <meta name="apple-mobile-web-app-title" content="GOEN Maracaibo" />
    <meta name="application-name" content="GOEN Maracaibo" />
    <meta name="msapplication-TileColor" content="#bf1a21" />
    <meta name="theme-color" content="#bf1a21" />
    {/* Manifest */}
    <link rel="manifest" href="/static/manifest.json" />
    {/* Title */}
    <title>{publicRuntimeConfig.SITE_NAME}</title>
  </Head>
);

export default Meta;
