import { render, fireEvent, screen } from "@testing-library/react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { DeleteButton } from "../DeleteButton";

describe("DeleteButton", () => {
  it("renders the button with the trash icon", () => {
    const fn = jest.fn();
    const { getByTestId } = render(<DeleteButton onClick={fn} />);
    const iconElement = getByTestId("trash-icon");
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveAttribute("data-icon", faTrash.iconName);
  });

  it("calls the onClick function when clicked", () => {
    const onClick = jest.fn();
    const deleteButton = render(<DeleteButton onClick={onClick} />);
    const buttonElement = deleteButton.getByTestId("delete-button");
    fireEvent.click(buttonElement);
    expect(onClick).toHaveBeenCalled();
  });
});
