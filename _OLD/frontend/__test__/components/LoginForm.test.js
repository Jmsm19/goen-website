import React from 'react';
import { render } from 'react-testing-library';
import LoginForm from '../../components/Forms/LoginForm';
import tFunction from '../utils/tFunction';

describe('Test Login Form component', () => {
  test('renders form', () => {
    const { getByText } = render(<LoginForm t={tFunction} />);
    expect(getByText('Correo electrónico'));
    expect(getByText('Contraseña'));
    expect(getByText('Iniciar sesión'));
    expect(getByText('Registrarse'));
  });
});
