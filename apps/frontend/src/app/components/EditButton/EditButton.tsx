import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components"
import { StyledEditButton } from "./EditButton.style";


interface EditButtonProps {
  onClick: () => void;
}

export const EditButton = ({ onClick }: EditButtonProps) => {
  return (
    <StyledEditButton onClick={onClick}>
      <FontAwesomeIcon data-testid="pen-icon" icon={faPenToSquare} />
    </StyledEditButton>
  )
}
