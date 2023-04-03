import { render, fireEvent } from '@testing-library/react';
import { SearchBar } from '../SearchBar';

describe('SearchBar', () => {
  const onChangeMock = jest.fn();
  const onClickMock = jest.fn();

  beforeEach(() => {
    onChangeMock.mockClear();
    onClickMock.mockClear();
  });

  it('renders the search icon', () => {
    const { getByTestId } = render(<SearchBar onChange={onChangeMock} onClick={onClickMock} value="" />);
    const searchIcon = getByTestId('search-icon');
    expect(searchIcon).toBeInTheDocument();
  });

  it('renders the input field with the correct placeholder', () => {
    const { getByPlaceholderText } = render(<SearchBar onChange={onChangeMock} onClick={onClickMock} value="" />);
    const inputField = getByPlaceholderText('Rechercher une série');
    expect(inputField).toBeInTheDocument();
  });

  it('calls onChange when the input field is changed', () => {
    const { getByPlaceholderText } = render(<SearchBar onChange={onChangeMock} onClick={onClickMock} value="" />);
    const inputField = getByPlaceholderText('Rechercher une série');
    fireEvent.change(inputField, { target: { value: 'test' } });
    expect(onChangeMock).toHaveBeenCalledWith(expect.any(Object)); // or with specific object if defined
  });

  // it('calls onClick when the close icon is clicked', () => {
  //   const { getByTestId } = render(<SearchBar onChange={onChangeMock} onClick={onClickMock} value="" />);
  //   const closeIcon = getByTestId('close-icon');
  //   fireEvent.click(closeIcon);
  //   expect(onClickMock).toHaveBeenCalled();
  // });
});
