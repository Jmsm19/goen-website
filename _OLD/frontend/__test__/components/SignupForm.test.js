import React from 'react';
import { render } from 'react-testing-library';
import SignupForm from '../../components/Forms/SignUpForm';
import tFunction from '../utils/tFunction';

describe('Test Register Form component', () => {
  test('renders form', () => {
    const { getByText } = render(<SignupForm t={tFunction} />);
    expect(getByText('Nombre completo'));
    expect(getByText('Fecha de nacimiento'));
    expect(getByText('Número telefónico'));
    expect(getByText('Correo electrónico'));
    expect(getByText('Contraseña'));
    expect(getByText('Confirmar contraseña'));
    expect(getByText('Registrarse'));
  });
});
