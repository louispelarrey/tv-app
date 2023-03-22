import useFetch from "../../hooks/useFetch";
import { Show } from "../Home/Home";
import { Table } from "../../components/Table/Table";
import { StyledWatchlist } from "./Watchlist.style";
import { ViewButton } from "../../components/ViewButton/ViewButton";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

interface UseFetchFollowed {
  data: Show[];
  loading: boolean;
  error?: string;
}

export function Watchlist() {

  const { data: followedShows, loading, error }: UseFetchFollowed = useFetch("/api/show/followed")
  const navigate = useNavigate();

  const onViewClick = useCallback((id: number) => navigate(`/show/${id}`), [navigate])

  return (
    <StyledWatchlist>
      <h1>Watchlist</h1>
      {loading && <p>Loading...</p>}

      {error && <p>{error}</p>}
      {followedShows && (
        <Table columns={["Titre", "Description", ""]}>
          {followedShows.map(followedShow => (
            <tr key={followedShow.id}>
              <td>{followedShow.name}</td>
              <td>{followedShow.description.substring(0, 50)}...</td>
              <td><ViewButton onClick={() => onViewClick(followedShow.id)} /></td>
            </tr>
          ))}
        </Table>
      )}
    </StyledWatchlist>
  );
}
