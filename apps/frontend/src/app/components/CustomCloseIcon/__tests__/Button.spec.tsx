import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { Button } from "../../Button/Button";

describe("Button", () => {
  it("renders the button with the correct text and type", () => {
    render(<Button type="submit">Submit</Button>);

    const button = screen.getByText("Submit");

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type", "submit");
  });
});
