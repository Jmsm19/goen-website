import React from 'react';
import { render } from 'react-testing-library';
import { I18nextProvider } from 'next-i18next/node_modules/react-i18next';
import { CleanPage } from '../../components/Page';
import i18n from '../utils/i18nForTest';

describe('Test Page component', () => {
  test('renders basic layout', () => {
    const { getByText } = render(
      <I18nextProvider i18n={i18n}>
        <CleanPage isAuth={false}>
          <div />
        </CleanPage>
      </I18nextProvider>,
    );
    expect(getByText('© 2018 - GOEN Maracaibo'));
  });
});
