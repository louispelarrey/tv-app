import { ShowCard } from "../components/ShowCard";
import styled from "styled-components";
import { ChangeEvent, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { UserContext, UserContextProps } from "../context/UserContext";
import { SearchBar, ShowContextBar } from "../components";
import { AddShow } from "../components/AddShow";

interface Show {
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

const StyledHome = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-around;
flex-wrap: wrap;
flex-shrink: 1;
flex-basis: 0;
@media (max-width: 1000px) {
  flex-direction: column;
}
`;

export function Home() {

  const [shows, setShows] = useState<Show[]>([]);
  const [search, setSearch] = useState<string>("");

  const { accessToken } = useContext<UserContextProps>(UserContext);

  /**
   * Fetches the shows from the database
   */
  const fetchShowsFromDB = useCallback(async () => {
    const res: Response = await fetch("/api/show", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`
      },
    })

    const fetchedShows: Show[] = await res.json()
    return fetchedShows
  }, [accessToken])

  /**
   * Fetches the images for the shows
   */
  const fetchImagesForShows = useCallback(async (shows: Show[]) => {
    const showsWithImagesRes: Show[] = await Promise.all(
      shows.map(
        (show: Show) => fetch(`http://api.tvmaze.com/singlesearch/shows?q=${show.name}`)
          .then(res => res.json())
          .then(res => ({ ...show, imagePath: res.image?.original }))
      )
    )
    return showsWithImagesRes
  }, [])

  /**
   * Fetches the shows from the database and then fetches the images for the shows
   */
  useEffect(() => {
    if (!accessToken) return;
    try {
      (async () => {
        const fetchedShows: Show[] = await fetchShowsFromDB()
        const showsWithImagesRes: Show[] = await fetchImagesForShows(fetchedShows)
        setShows(showsWithImagesRes)
      })();
    } catch (error) {
      console.error(error)
    }
  }, [accessToken, fetchImagesForShows, fetchShowsFromDB])

  /**
   * Filters the shows based on the search input
   *
   * @param shows The shows to filter
   * @param search The search input
   * @returns The filtered shows
   */
  const filterShows: Show[] = useMemo(() => {
    return shows.filter((show: Show) => show.name.toLowerCase().includes(search.toLowerCase()))
  }, [search, shows])

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);
  const handleClickDeleteSearch = () => setSearch("");

  return (
    <div>
      <StyledHome>
        <ShowContextBar onChange={handleSearch} onClick={handleClickDeleteSearch} value={search} />
        {filterShows.map(show => (
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
