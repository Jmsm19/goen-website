import React from 'react';
import { render } from 'react-testing-library';
import IndexPage from '../pages/index';

describe('Test Index Page', () => {
  test('renders page greeting', () => {
    const { getByText } = render(<IndexPage />);
    expect(getByText('Hello from Next'))
  })

  test('renders button to get data', () => {
    const { getByText } = render(<IndexPage />);
    expect(getByText('Get Data'))
  })
})