import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { AddShow } from '../AddShow';

describe('AddShow', () => {
  it('renders the add button', () => {
    render(<AddShow onSubmit={() => {}} openModal={() => {}} closeModal={() => {}} openModalState={false} />);
    const addButton = screen.getByLabelText('add show');
    expect(addButton).toBeInTheDocument();
  });

  it('opens the modal when the add button is clicked', () => {
    const openModalMock = jest.fn();
    render(<AddShow onSubmit={() => {}} openModal={openModalMock} closeModal={() => {}} openModalState={false} />);
    const addButton = screen.getByLabelText('add show');
    fireEvent.click(addButton);
    expect(openModalMock).toHaveBeenCalled();
  });

  it('closes the modal when the close button is clicked', () => {
    const closeModalMock = jest.fn();
    render(<AddShow onSubmit={() => {}} openModal={() => {}} closeModal={closeModalMock} openModalState={true} />);
    const closeButton = screen.getByLabelText('close');
    fireEvent.click(closeButton);
    expect(closeModalMock).toHaveBeenCalled();
  });

  it('calls onSubmit when the form is submitted', () => {
    const onSubmitMock = jest.fn();
    render(<AddShow onSubmit={onSubmitMock} openModal={() => {}} closeModal={() => {}} openModalState={true} />);
    const submitButton = screen.getByRole('button', { name: 'submit' });
    fireEvent.click(submitButton);
    expect(onSubmitMock).toHaveBeenCalled();
  });
});
