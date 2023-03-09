import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { AddShow } from '../AddShow';

describe('AddShow', () => {
  const fn = jest.fn();

  it('renders the add button', () => {
    render(<AddShow onSubmit={fn} openModal={fn} closeModal={fn} openModalState={false} />);
    const addButton = screen.getByLabelText('add show');
    expect(addButton).toBeInTheDocument();
  });

  it('opens the modal when the add button is clicked', () => {
    const openModalMock = jest.fn();
    render(<AddShow onSubmit={fn} openModal={openModalMock} closeModal={fn} openModalState={false} />);
    const addButton = screen.getByLabelText('add show');
    fireEvent.click(addButton);
    expect(openModalMock).toHaveBeenCalled();
  });

  it('closes the modal when the close button is clicked', () => {
    const closeModalMock = jest.fn();
    render(<AddShow onSubmit={fn} openModal={fn} closeModal={closeModalMock} openModalState={true} />);
    const closeButton = screen.getByLabelText('close');
    fireEvent.click(closeButton);
    expect(closeModalMock).toHaveBeenCalled();
  });

  it('calls onSubmit when the form is submitted', () => {
    const onSubmitMock = jest.fn();
    render(<AddShow onSubmit={onSubmitMock} openModal={fn} closeModal={fn} openModalState={true} />);
    const submitButton = screen.getByRole('button', { name: 'submit' });
    fireEvent.click(submitButton);
    expect(onSubmitMock).toHaveBeenCalled();
  });
});
