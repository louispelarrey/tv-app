import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components"
import { StyledDeleteButton } from "./DeleteButton.style";

interface DeleteButtonProps {
  onClick: () => void;
}

export const DeleteButton = ({ onClick }: DeleteButtonProps) => {
  return (
    <StyledDeleteButton onClick={onClick}>
      <FontAwesomeIcon data-testid="delete-icon" icon={faTrash} />
    </StyledDeleteButton>
  )
}
