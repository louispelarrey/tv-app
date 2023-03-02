import { render, screen } from "@testing-library/react";
import { Button } from "../Button";
import '@testing-library/jest-dom';

describe("Button", () => {
  it("renders the button with the correct text and type", () => {
    render(<Button type="submit">Submit</Button>);

    const button = screen.getByText("Submit");

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type", "submit");
  });
});
