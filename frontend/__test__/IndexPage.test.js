import React from 'react';
import { render } from 'react-testing-library';
import { I18nextProvider } from 'next-i18next/node_modules/react-i18next';
import { IndexPage } from '../pages/index';
import i18n from './utils/i18nForTest';
import tFunction from './utils/tFunction';

describe('Test Index Page', () => {
  test('renders page greeting', () => {
    const { getByText } = render(
      <I18nextProvider i18n={i18n}>
        <IndexPage t={tFunction} />
      </I18nextProvider>

    );
    expect(getByText('Hello from Next'))
  })

  test('renders button to get data', () => {
    const { getByText } = render(
      <I18nextProvider i18n={i18n}>
        <IndexPage t={tFunction} />
      </I18nextProvider>
    );
    expect(getByText('Buscar datos'))
  })
})