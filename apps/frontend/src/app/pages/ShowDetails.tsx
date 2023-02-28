import { useCallback } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import { Show } from "./Home"

const StyledShowDetails = styled.div`

`

export const ShowDetails = () => {

  const { id } = useParams<{ id: string }>()


  return (
    <StyledShowDetails>
      {/* {show && (
        <>
          <h1>{show.name}</h1>
          <p>{show.description}</p>
          <img src={show.imagePath} alt={show.name} />
        </>
      )} */}
    </StyledShowDetails>
  )
}
