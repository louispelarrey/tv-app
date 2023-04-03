import { ShowCard } from "@tv-app/show/feature/home";
import { ChangeEvent, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { UserContext, UserContextProps, ServiceContext, useFetch } from "@tv-app/utility";
import { CreateShowData, ShowContextBar } from "@tv-app/show/feature/home";
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
  const { data, error, loading } = useFetch("/api/show")

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

    if (!response || response.status !== 201) {
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
    <>
      <ShowContextBar
        onChange={handleSearch}
        onClick={handleClickDeleteSearch}
        value={search}
        onSubmit={createShow}
        openModal={openModal}
        closeModal={closeModal}
        openModalState={modalIsOpen}
      />
      <StyledHome>

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
    </>
  );
}
