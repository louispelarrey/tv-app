import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components"


interface EditButtonProps {
  onClick: () => void;
}

const StyledEditButton = styled.div`
  cursor: pointer;
  border: none;
  background: none;
  font-size: 1.5rem;
  color: #8f9164;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  opacity: 0.9;
`

export const EditButton = ({ onClick }: EditButtonProps) => {
  return (
    <StyledEditButton onClick={onClick}>
      <FontAwesomeIcon data-testid="pen-icon" icon={faPenToSquare} />
    </StyledEditButton>
  )
}
