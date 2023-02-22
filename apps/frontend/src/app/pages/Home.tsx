import { ShowCard } from "../components/ShowCard";
import styled from "styled-components";
import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext, UserContextProps } from "../context/UserContext";
import { useLocation } from "react-router-dom";

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

export function Home() {

  const [shows, setShows] = useState<Show[]>([]);
  const { accessToken } = useContext<UserContextProps>(UserContext);
  const location = useLocation();

  const StyledHome = styled.div`
    max-width: 100vw;
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

  /**
   * Fetches the shows from the database
   */
  const fetchShowsFromDB = useCallback(async () => {
    const res: Response = await fetch(process.env.NX_SERVER_URL + "/api/show" + (location.pathname === "/watchlist" ? "/followed" : ""), {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`
      },
    })

    const fetchedShows: Show[] = await res.json()
    return fetchedShows
  }, [accessToken, location])

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
  const fetchShows = useCallback(async () => {
    if (!accessToken) return;
    try {
      const fetchedShows: Show[] = await fetchShowsFromDB()
      const showsWithImagesRes: Show[] = await fetchImagesForShows(fetchedShows)
      setShows(showsWithImagesRes)
    } catch (error) {
      console.error(error)
    }
  }, [accessToken, fetchImagesForShows, fetchShowsFromDB])

  useEffect(() => {
    fetchShows()
  }, [accessToken, fetchShows]);

  if (!accessToken) return null;

  return (
    <div>
      <StyledHome>
        {shows.length > 0 && shows.map(show => (
          <ShowCard key={show.id} id={show.id} name={show.name} description={show.description} imagePath={show.imagePath} likes={show.followedBy.length} />
        ))}
      </StyledHome>
    </div>
  );
}
