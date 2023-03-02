import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Input } from '../Input';

describe('Input component', () => {
  it('should render an input element', () => {
    const onChangeMock = jest.fn();
    render(
      <Input type="text" placeholder="Enter your name" onChange={onChangeMock} />
    );
    const inputElement = screen.getByPlaceholderText('Enter your name');
    expect(inputElement).toBeInTheDocument();
  });

  it('should allow user input', async () => {
    const onChangeMock = jest.fn();
    render(<Input type="text" placeholder="Test" onChange={onChangeMock} />);

    const inputElement = screen.getByRole('textbox');
    await userEvent.type(inputElement, 'test');

    expect(inputElement).toHaveValue('test');
  });



  it('should render with additional props', () => {
    const testId = 'test-id';
    const onChangeMock = jest.fn();
    render(<Input type="text" data-testid={testId} onChange={onChangeMock} />);
    const inputElement = screen.getByTestId(testId);
    expect(inputElement).toBeInTheDocument();
  });
});

