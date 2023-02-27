import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from '@fortawesome/free-solid-svg-icons'

interface CustomCloseIconProps {
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const StyledIcon = styled(FontAwesomeIcon)`
  font-size: 1.9rem;
  :hover {
    cursor: pointer;
  }
`;

export const CustomCloseIcon = ({onClick}: CustomCloseIconProps) => (
  <div onClick={onClick}>
    <StyledIcon icon={faClose} color="white" size="2x"/>
  </div>
);
