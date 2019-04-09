import React from 'react';
import { render } from 'react-testing-library';
import Meta from '../../components/SiteGeneral/Meta';

describe('Test Meta component', () => {
  test('renders', () => {
    render(<Meta />);
  });
});
