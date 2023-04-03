import { render, fireEvent } from "@testing-library/react";
import { ShowContextBar } from "../ShowContextBar";

describe("ShowContextBar", () => {
  const mockOnChange = jest.fn();
  const mockOnClick = jest.fn();
  const mockOnSubmit = jest.fn();
  const mockOpenModal = jest.fn();
  const mockCloseModal = jest.fn();

  const defaultProps = {
    onChange: mockOnChange,
    onClick: mockOnClick,
    value: "",
    onSubmit: mockOnSubmit,
    openModal: mockOpenModal,
    closeModal: mockCloseModal,
    openModalState: false,
  };

  // it("should render SearchBar and AddShow components", () => {
  //   const { getByTestId } = render(<ShowContextBar {...defaultProps} />);
  //   expect(getByTestId("search-bar")).toBeInTheDocument();
  //   expect(getByTestId("add-show")).toBeInTheDocument();
  // });

  // it("should call onChange callback when SearchBar input is changed", () => {
  //   const { getByTestId } = render(<ShowContextBar {...defaultProps} />);
  //   const searchBarInput = getByTestId("search-bar-input");
  //   fireEvent.change(searchBarInput, { target: { value: "test" } });
  //   expect(mockOnChange).toHaveBeenCalled();
  // });

  // it("should call onClick callback when SearchBar is clicked", () => {
  //   const { getByTestId } = render(<ShowContextBar {...defaultProps} />);
  //   const searchBar = getByTestId("search-bar");
  //   fireEvent.click(searchBar);
  //   expect(mockOnClick).toHaveBeenCalled();
  // });

  // it("should call onSubmit callback when AddShow form is submitted", () => {
  //   const { getByTestId } = render(<ShowContextBar {...defaultProps} />);
  //   const addShowForm = getByTestId("add-show-form");
  //   fireEvent.submit(addShowForm);
  //   expect(mockOnSubmit).toHaveBeenCalled();
  // });

  // it("should call openModal callback when AddShow button is clicked", () => {
  //   const { getByTestId } = render(<ShowContextBar {...defaultProps} />);
  //   const addShowButton = getByTestId("add-show-button");
  //   fireEvent.click(addShowButton);
  //   expect(mockOpenModal).toHaveBeenCalled();
  // });

  // it("should call closeModal callback when AddShow modal is closed", () => {
  //   const { getByTestId } = render(<ShowContextBar {...defaultProps} />);
  //   const addShowModal = getByTestId("add-show-modal");
  //   fireEvent.click(addShowModal);
  //   expect(mockCloseModal).toHaveBeenCalled();
  // });
});
