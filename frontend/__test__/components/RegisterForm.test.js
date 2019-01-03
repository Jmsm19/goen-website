import React from 'react';
import { render } from 'react-testing-library';
import { RegisterForm } from '../../components/RegisterForm';
import tFunction from '../utils/tFunction';

describe('Test Register Form component', () => {
  test('renders form', () => {
    const { getByText } = render(
      <RegisterForm t={tFunction} />
    );
    expect(getByText('Nombre'))
    expect(getByText('Fecha de nacimiento'))
    expect(getByText('Número telefónico'))
    expect(getByText('Correo electrónico'))
    expect(getByText('Contraseña'))
    expect(getByText('Confirmar contraseña'))
    expect(getByText('Registrarse'))
  })
})