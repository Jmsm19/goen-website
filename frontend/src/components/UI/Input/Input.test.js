import 'jest-dom/extend-expect';
import React from 'react';
import { render, waitForElement, fireEvent, cleanup } from 'react-testing-library';

import Input from './index';

afterEach(cleanup);

const basicTextSetup = async () => {
  const mockOnChange = jest.fn();
  const placeholderText = 'Text Input';
  const inputName = 'Name';
  const { getByPlaceholderText } = render(
    <Input type='text' name={inputName} placeholder={placeholderText} onChange={mockOnChange} />,
  );

  return {
    getByPlaceholderText,
    mockOnChange,
    placeholderText,
    inputName,
  };
};

describe('Input', () => {
  it('it renders an input with a placeholder', async () => {
    const { getByPlaceholderText, placeholderText } = await basicTextSetup();

    await waitForElement(() => getByPlaceholderText(placeholderText));
  });

  it("it calls 'onChange' on input value change", async () => {
    const {
      mockOnChange,
      getByPlaceholderText,
      placeholderText,
      inputName,
    } = await basicTextSetup();

    const text = 'Changed value';
    const input = getByPlaceholderText(placeholderText);

    fireEvent.change(input, {
      target: { name: inputName, value: text },
    });

    expect(mockOnChange).toHaveBeenCalled();
    expect(input.value).toEqual(text);
  });
});
