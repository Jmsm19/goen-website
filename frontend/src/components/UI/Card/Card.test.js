import 'jest-dom/extend-expect';
import React from 'react';
import { cleanup, render, waitForElement, fireEvent } from 'react-testing-library';

import Card from './index';
import Button from '../Button';

afterEach(cleanup);

describe('Card', () => {
  it('it renders a card with a title and a child paragraph', async () => {
    const cardTitle = 'Card title';
    const cardText = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.';

    const { getByText } = render(
      <Card title={cardTitle}>
        <p>{cardText}</p>
      </Card>,
    );

    // Card renders
    await waitForElement(() => getByText(cardTitle));

    // Paragraph renders inside Card
    await waitForElement(() => getByText(cardText));
  });

  it('it renders a card with a child Button component', async () => {
    const btnText = 'Click Me';
    const mockOnClick = jest.fn();
    const { getByText } = render(
      <Card>
        <Button text={btnText} onClick={mockOnClick} />
      </Card>,
    );

    // Button renders inside Card
    await waitForElement(() => getByText(btnText));

    // Button works without issues
    fireEvent.click(getByText(btnText));
    expect(mockOnClick).toHaveBeenCalled();
  });
});
