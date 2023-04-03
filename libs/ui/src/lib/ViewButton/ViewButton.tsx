import { MouseEventHandler } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { StyledViewButton } from "./ViewButton.style";

interface ViewButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const ViewButton = ({ onClick }: ViewButtonProps) => {
  return (
    <StyledViewButton onClick={onClick} data-testid="view-button" data-cy="view-button">
        <FontAwesomeIcon data-testid="eye-icon" icon={faEye} />
    </StyledViewButton>
  );
};
