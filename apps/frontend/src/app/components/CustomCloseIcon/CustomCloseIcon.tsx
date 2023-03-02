import { faClose } from '@fortawesome/free-solid-svg-icons'
import { StyledIcon } from './CustomCloseIcon.style';

interface CustomCloseIconProps {
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const CustomCloseIcon = ({onClick}: CustomCloseIconProps) => (
  <div onClick={onClick}>
    <StyledIcon icon={faClose} color="white" size="2x"/>
  </div>
);
