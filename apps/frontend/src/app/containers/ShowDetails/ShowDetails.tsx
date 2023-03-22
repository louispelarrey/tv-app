import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import { DeleteButton } from "../../components/DeleteButton/DeleteButton"
import { EditButton } from "../../components/EditButton/EditButton"
import { Table } from "../../components/Table/Table"
import { ServiceContext } from "../../context/Service/ServiceContext"
import { UserContext, UserContextProps } from "../../context/User/UserContext"
import SeasonService from "../../services/season/SeasonService"
import { Show } from "../Home/Home"
import { StyledShowDetails } from "./ShowDetails.style"

export interface Season {
  id: string
  name: string
  description: string
  show: Show
}

export const ShowDetails = () => {

  const { id } = useParams<{ id: string }>()
  const [show, setShow] = useState<Show | undefined>(undefined)
  const [seasons, setSeasons] = useState<Season[] | undefined>(undefined)

  const { accessToken } = useContext<UserContextProps>(UserContext);
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
          <h1 data-cy="details-name">{show.name}</h1>
          <p data-cy="details-description">{show.description}</p>
          {seasons && (
            <Table columns={["Saison", "Description", "", ""]}>
              {seasons.map((season) => (
                <tr key={season.id}>
                  <td>{season.name}</td>
                  <td>{season.description}</td>
                  <td><EditButton onClick={() => handleEdit(season.id)} /></td>
                  <td><DeleteButton onClick={() => handleDelete(season.id)} /></td>
                </tr>
              ))}
            </Table>
          )}
        </>
      )}
    </StyledShowDetails>
  )
}
