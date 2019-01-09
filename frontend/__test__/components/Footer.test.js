import React from 'react';
import { render } from 'react-testing-library';
import { CleanFooter } from '../../components/Footer';
import i18n from '../utils/i18nForTest';
import tFunction from '../utils/tFunction';

describe('Test Footer', () => {
  test('renders Footer component', () => {
    const { getByText } = render(<CleanFooter t={tFunction} i18n={i18n} />);
    expect(getByText('© 2018 - GOEN Maracaibo'));
    expect(getByText('Ingles'));
    expect(getByText('Español'));
  });
});
