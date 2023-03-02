import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components"


interface DeleteButtonProps {
  onClick: () => void;
}

const StyledDeleteButton = styled.div`
  cursor: pointer;
  border: none;
  background: none;
  font-size: 1.5rem;
  color: #646491;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  opacity: 0.9;
`

export const DeleteButton = ({ onClick }: DeleteButtonProps) => {
  return (
    <StyledDeleteButton onClick={onClick}>
      <FontAwesomeIcon data-testid="heart-icon" icon={faTrash} />
    </StyledDeleteButton>
  )
}
