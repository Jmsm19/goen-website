import 'jest-dom/extend-expect';
import React from 'react';
import { render, waitForElement, fireEvent, cleanup } from 'react-testing-library';

import Button from './index';

afterEach(cleanup);

describe('Button', () => {
  it('it renders button with text', async () => {
    const btnText = 'Click Me';
    const mockClickFn = jest.fn();
    const { getByText } = render(<Button text={btnText} onClick={mockClickFn} />);

    await waitForElement(() => getByText(btnText));
  });

  it("it calls 'onClick' on button click", async () => {
    const btnText = 'Click Me';
    const mockClickFn = jest.fn();
    const { getByText } = render(<Button text={btnText} onClick={mockClickFn} />);

    fireEvent.click(getByText(btnText));
    expect(mockClickFn).toHaveBeenCalled();
  });
});
