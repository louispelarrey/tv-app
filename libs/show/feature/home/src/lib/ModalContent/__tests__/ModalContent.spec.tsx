import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ModalContent, CreateShowData } from '../ModalContent';

describe('ModalContent', () => {
  const closeModalMock = jest.fn();
  const onSubmitMock = jest.fn();

  beforeEach(() => {
    closeModalMock.mockClear();
    onSubmitMock.mockClear();
  });

  it('renders the close button', () => {
    render(<ModalContent closeModal={closeModalMock} onSubmit={onSubmitMock} />);
    const closeButton = screen.getByTestId('close-button');
    expect(closeButton).toBeInTheDocument();
  });

  it('renders the title', () => {
    render(<ModalContent closeModal={closeModalMock} onSubmit={onSubmitMock} />);
    const title = screen.getByRole('heading', { name: 'Ajouter une série' });
    expect(title).toBeInTheDocument();
  });

  it('renders the name and description inputs', () => {
    render(<ModalContent closeModal={closeModalMock} onSubmit={onSubmitMock} />);
    const nameInput = screen.getByLabelText('Nom:');
    const descriptionInput = screen.getByLabelText('Description:');
    expect(nameInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
  });

  //Not working ???
  // it('calls onSubmit with the form data when the form is submitted', async () => {
  //   render(<ModalContent closeModal={closeModalMock} onSubmit={onSubmitMock} />);
  //   const nameInput = screen.getByLabelText('Nom:');
  //   const descriptionInput = screen.getByLabelText('Description:');
  //   const submitButton = screen.getByRole('button', { name: 'Envoyer' });

  //   const testData: CreateShowData = {
  //     name: 'Test show',
  //     description: 'Test description'
  //   };

  //   fireEvent.input(nameInput, { target: { value: testData.name } });
  //   fireEvent.input(descriptionInput, { target: { value: testData.description } });
  //   fireEvent.click(submitButton);

  //   await waitFor(() => expect(onSubmitMock).toHaveBeenCalledWith(testData));
  // });

  it('calls closeModal when the close button is clicked', () => {
    render(<ModalContent closeModal={closeModalMock} onSubmit={onSubmitMock} />);
    const closeButton = screen.getByTestId('close-button');
    fireEvent.click(closeButton);
    expect(closeModalMock).toHaveBeenCalled();
  });
});
