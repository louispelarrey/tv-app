import { ShowCard } from "../components/ShowCard";
import styled from "styled-components";
import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
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
  const { accessToken } = useContext(UserContext);
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

  const fetchShows = useCallback(async () => {
    if (!accessToken) return;
    try {
      const res = await fetch(process.env.NX_SERVER_URL + "/api/show" + (location.pathname === "/watchlist" ? "/followed" : "") , {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${accessToken}`
        },
      })

      const fetchedShows = await res.json()
      const showsWithImagesRes = await Promise.all(
        fetchedShows.map(
          (show: Show) => fetch(`http://api.tvmaze.com/singlesearch/shows?q=${show.name}`)
            .then(res => res.json())
            .then(res => ({ ...show, imagePath: res.image?.original }))
        )
      )

      setShows(showsWithImagesRes)
    } catch (error) {
      console.error(error)
    }
  }, [accessToken, location])

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
