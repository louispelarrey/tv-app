import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';
import { ShowCard, ShowCardProps } from "../ShowCard/ShowCard";

describe("ShowCard", () => {
  const props: ShowCardProps = {
    id: 1,
    name: "Test Show",
    description: "This is a test show",
    likes: 10,
    imagePath: "test-image.jpg",
  };

  it("renders the show card with correct props", () => {
    render(
      <BrowserRouter>
        <ShowCard {...props} />
      </BrowserRouter>
    );

    const nameElement = screen.getByText(props.name);
    const descriptionElement = screen.getByText(props.description);
    const likesElement = screen.queryByText(/10/);

    expect(nameElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
    expect(likesElement).toBeInTheDocument();
  });

});
