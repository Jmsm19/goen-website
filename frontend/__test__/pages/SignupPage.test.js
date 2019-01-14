import React from 'react';
import { render } from 'react-testing-library';
import { SignupPage } from '../../pages/signup';
import tFunction from '../utils/tFunction';

describe('Test Signup Page', () => {
  test("renders page's form", () => {
    const { getByText } = render(<SignupPage t={tFunction} />);
    expect(getByText('Nombre completo'));
    expect(getByText('Fecha de nacimiento'));
    expect(getByText('Número telefónico'));
    expect(getByText('Correo electrónico'));
    expect(getByText('Contraseña'));
    expect(getByText('Confirmar contraseña'));
    expect(getByText('Registrarse'));
  });
});
