import useFetch from "../../hooks/useFetch";
import { Show } from "../Home/Home";
import { Table } from "../../components/Table/Table";
import { StyledWatchlist } from "./Watchlist.style";

interface UseFetchFollowed {
  data: Show[];
  loading: boolean;
  error?: string;
}

export function Watchlist() {

  const { data: followedShows, loading, error }: UseFetchFollowed = useFetch("/api/show/followed")

  return (
    <StyledWatchlist>
      <h1>Watchlist</h1>
      {loading && <p>Loading...</p>}

      {error && <p>{error}</p>}
      {followedShows && (
        <Table columns={["Titre", "Description"]}>
          {followedShows.map(followedShow => (
            <tr key={followedShow.id}>
              <td>{followedShow.name}</td>
              <td>{followedShow.description.substring(0, 50)}...</td>
            </tr>
          ))}
        </Table>
      )}
    </StyledWatchlist>
  );
}
