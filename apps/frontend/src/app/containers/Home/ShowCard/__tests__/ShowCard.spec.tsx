import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { ServiceContext } from "../../../../context/Service/ServiceContext";
import { UserContext } from "../../../../context/User/UserContext";
import { ShowCard, ShowCardProps } from "../ShowCard";

const mockShow: ShowCardProps = {
  id: 1,
  name: "Mock Show",
  description: "This is a mock show",
  imagePath: "https://source.unsplash.com/random/1920x1080/?wallpaper,landscape",
  likes: 0,
};

const mockServiceContext = {
  services: {
    ShowService: {
      toggleFollowShow: jest.fn(),
      deleteShow: jest.fn(),
    },
  },
};

const mockUserContext = {
  accessToken: "mock-access-token",
};

describe("ShowCard", () => {
  beforeEach(() => {
    render(
      <ServiceContext.Provider value={mockServiceContext}>
        <UserContext.Provider value={mockUserContext}>
          <BrowserRouter>
            <ShowCard {...mockShow} />
          </BrowserRouter>
        </UserContext.Provider>
      </ServiceContext.Provider>
    );
  });

  it("renders the show name and description", () => {
    const nameElement = screen.getByText(mockShow.name);
    const descriptionElement = screen.getByText(mockShow.description);

    expect(nameElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });

  it("renders the show image", () => {
    const imageElement = screen.getByAltText(mockShow.name);

    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", mockShow.imagePath);
  });

  // it("calls the toggleFollowShow function when the like button is clicked", () => {
  //   const likeButton = screen.getByTestId("like-button");
  //   userEvent.click(likeButton);

  //   expect(mockServiceContext.services.ShowService.toggleFollowShow).toHaveBeenCalledWith(
  //     mockShow.id,
  //     mockUserContext.accessToken
  //   );
  // });

  // it("calls the deleteShow function and navigates to the home page when the delete button is clicked", async () => {
  //   const deleteButton = screen.getByTestId("delete-button");
  //   userEvent.click(deleteButton);

  //   expect(mockServiceContext.services.ShowService.deleteShow).toHaveBeenCalledWith(
  //     mockShow.id,
  //     mockUserContext.accessToken
  //   );
  //   expect(await screen.findByText(/mock show/i)).not.toBeInTheDocument();
  //   expect(window.location.pathname).toBe("/");
  // });

  // it("navigates to the show page when the card is clicked", () => {
  //   const cardElement = screen.getByRole("img", { name: mockShow.name });
  //   console.log("aaaa", cardElement)
  //   userEvent.click(cardElement);

  //   expect(window.location.pathname).toBe(`/show/${mockShow.id}`);
  // });
});
