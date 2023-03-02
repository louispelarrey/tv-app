import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import { DeleteButton } from "../../components/DeleteButton/DeleteButton"
import { EditButton } from "../../components/EditButton/EditButton"
import { ServiceContext } from "../../context/Service/ServiceContext"
import { UserContext, UserContextProps } from "../../context/User/UserContext"
import SeasonService from "../../services/season/SeasonService"
import { Show } from "../Home/Home"

export interface Season {
  id: string
  name: string
  description: string
  show: Show
}

const StyledShowDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  flex-shrink: 1;
  flex-basis: 0;
  margin-top: 1rem;

  @media (max-width: 1000px) {
    flex-direction: column;
  }

  .season-table {
    width: 85%;
    border-collapse: collapse;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  }

  .season-table thead tr {
    background-color: #009879;
    color: #ffffff;
    text-align: left;
    font-weight: bold;
  }

  .season-table th,
  .season-table td {
    padding: 12px 15px;
  }

  .season-table tbody tr {
    border-bottom: 1px solid #dddddd;
  }

  .season-table tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
  }

  .season-table tbody tr:last-of-type {
    border-bottom: 2px solid #009879;
  }

  .season-table tbody tr.active-row {
    font-weight: bold;
    color: #009879;
  }

  #show-image {
    width: 300px;
    height: 300px;
    object-fit: cover;
    border-radius: 50%;
    border: 4px solid #009879;
  }

  h1 {
    font-size: 2rem;
    margin: 0;
    text-align: center;
  }

  p {
    width: 80%;
    text-align: center;
  }

  @media screen and (min-width: 765px) {
    p {
      width: 60%;
    }
  }
`

export const ShowDetails = () => {

  const { id } = useParams<{ id: string }>()
  const [show, setShow] = useState<Show | undefined>(undefined)
  const [seasons, setSeasons] = useState<Season[] | undefined>(undefined)

  const {accessToken} = useContext<UserContextProps>(UserContext);
  const {
    services: {
      ShowService,
      SeasonService,
    }
  } = useContext(ServiceContext);

  useEffect(() => {
    if (!id) return

    const specificShow = async (id: string, accessToken: string) => {
      const show = await ShowService.fetchSpecificShow(id, accessToken);
      setShow(show);
    }

    specificShow(id, accessToken);
  }, [id, accessToken, ShowService])

  useEffect(() => {
    if (!show) return

    const seasons = async (show: Show, accessToken: string) => {
      const seasons = await SeasonService.fetchSeasonsByShow(show, accessToken);
      setSeasons(seasons);
    }

    seasons(show, accessToken);
  }, [show, accessToken, SeasonService])

  const handleEdit = (id: string) => console.log("edit", id)
  const handleDelete = (id: string) => console.log("delete", id)

  return (
    <StyledShowDetails>
      {show && (
        <>
          <img src={show.imagePath} alt={show.name} id="show-image" />
          <h1>{show.name}</h1>
          <p>{show.description}</p>
          {seasons && (
            <table className="season-table">
              <thead>
                <tr>
                  <th>Saison</th>
                  <th>Description</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {seasons.map((season) => (
                  <tr key={season.id}>
                    <td>{season.name}</td>
                    <td>{season.description}</td>
                    <td><EditButton onClick={() => handleEdit(season.id)}/></td>
                    <td><DeleteButton onClick={() => handleDelete(season.id)}/></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </StyledShowDetails>
  )
}
