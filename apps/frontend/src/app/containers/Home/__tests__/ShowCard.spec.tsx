import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import { ShowCard, ShowCardProps } from "../ShowCard";

describe("ShowCard", () => {
  const props: ShowCardProps = {
    id: 1,
    name: "Test Show",
    description: "This is a test show",
    likes: 10,
    imagePath: "test-image.jpg",
  };

  it("renders the show card with correct props", () => {
    render(<ShowCard {...props} />);

    const nameElement = screen.getByText(props.name);
    const descriptionElement = screen.getByText(props.description);
    const likesElement = screen.queryByText(/10/);

    expect(nameElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
    expect(likesElement).toBeInTheDocument();
  });

});
