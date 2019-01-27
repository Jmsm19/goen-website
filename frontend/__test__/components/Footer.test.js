import React from 'react';
import { render } from 'react-testing-library';
import Footer from '../../components/Footer';
import i18n from '../utils/i18nForTest';
import tFunction from '../utils/tFunction';

describe('Test Footer', () => {
  test('renders Footer component', () => {
    const { getByText } = render(<Footer t={tFunction} />);
    expect(getByText('© 2018 - GOEN Maracaibo'));
  });
});
