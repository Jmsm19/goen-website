import React from 'react';
import { render } from 'react-testing-library';
import { LoginPage } from '../../pages/login';
import tFunction from '../utils/tFunction';

describe('Test Login Page', () => {
  test("renders page's email and password inputs and button", () => {
    const { getByText } = render(<LoginPage t={tFunction} />);
    expect(getByText('Correo electrónico'));
    expect(getByText('Contraseña'));
    expect(getByText('Iniciar sesión'));
    expect(getByText('Registrarse'));
  });
});
