import { ShowCard } from "./ShowCard";
import { ChangeEvent, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { UserContext, UserContextProps } from "../../context/User/UserContext";
import { ShowContextBar } from "../../components";
import { CreateShowData } from "./ModalContent";
import { ServiceContext } from "../../context/Service/ServiceContext";
import { StyledHome } from "./Home.style";

export interface Show {
  id: number;
  name: string;
  description: string;
  imagePath: string;
  followedBy: User[];
}

interface User {
  id: number;
  username: string;
}

export const Home = () => {

  const [shows, setShows] = useState<Show[] | undefined>([]);
  const [search, setSearch] = useState<string>("");
  const [modalIsOpen, setIsOpen] = useState(false);

  const { accessToken } = useContext<UserContextProps>(UserContext);
  const {
    services: {
      ShowService,
    }
  } = useContext(ServiceContext);

  const setShowsFromApi = useCallback(async () => {
    const shows = await ShowService.fetchShowsAndImages(accessToken)
    setShows(shows)
  }, [ShowService, accessToken])

  /**
   * Fetches the shows from the database and then fetches the images for the shows
   */
  useEffect(() => {
    setShowsFromApi()
  }, [setShowsFromApi])

  /**
   * Filters the shows based on the search input
   *
   * @param shows The shows to filter
   * @param search The search input
   * @returns The filtered shows
   */
  const filterShows: Show[] | undefined = useMemo(() => {
    return shows?.filter((show: Show) => show.name.toLowerCase().includes(search.toLowerCase()))
  }, [search, shows])

  const createShow = async ({ name, description }: CreateShowData) => {
    const response = await ShowService.createShow(name, description, accessToken);

    if (response?.status !== 201) {
      return;
    }

    await response.json();
    setShowsFromApi();
    closeModal();
  };

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);
  const handleClickDeleteSearch = () => setSearch("");

  return (
    <div>
      <StyledHome>
        <ShowContextBar
          onChange={handleSearch}
          onClick={handleClickDeleteSearch}
          value={search}
          onSubmit={createShow}
          openModal={openModal}
          closeModal={closeModal}
          openModalState={modalIsOpen}
        />
        {filterShows && filterShows.map(show => (
          <ShowCard
            key={show.id}
            id={show.id}
            name={show.name}
            description={show.description}
            imagePath={show.imagePath}
            likes={show.followedBy.length}
          />
        ))}
      </StyledHome>
    </div>
  );
}
