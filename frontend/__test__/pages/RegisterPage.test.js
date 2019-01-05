import React from 'react';
import { render } from 'react-testing-library';
import { RegisterPage } from '../../pages/register';
import tFunction from '../utils/tFunction';

describe('Test Register Page', () => {
  test('renders page\'s form', () => {
    const { getByText } = render(
      <RegisterPage t={tFunction} />
    );
    expect(getByText('Nombre completo'))
    expect(getByText('Fecha de nacimiento'))
    expect(getByText('Número telefónico'))
    expect(getByText('Correo electrónico'))
    expect(getByText('Contraseña'))
    expect(getByText('Confirmar contraseña'))
    expect(getByText('Registrarse'))
  })
})