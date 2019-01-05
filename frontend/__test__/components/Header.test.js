import React from 'react';
import { render } from 'react-testing-library';
import { Header } from '../../components/Header';
import tFunction from '../utils/tFunction';

// Props
const router = {
  asPath: '/'
};

jest.mock('../../context/AuthContext', () => ({
  AuthContextConsumer: ({children}) => children({
    isAuth: true,
    authUser: {
      name: 'Tester',
    }
  })
}))

describe('Test Header component', () => {
  test('renders Header', () => {

    const { getByText } = render(
      <Header t={tFunction} router={router} />
    );
  })
});