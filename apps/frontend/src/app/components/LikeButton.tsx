import { FC, MouseEventHandler } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

interface LikeButtonProps {
  likes: number;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const StyledLikeButton = styled.button`
  cursor: pointer;
  border: none;
  background: none;
  font-size: 1.5rem;
  color: red;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

`;


export const LikeButton: FC<LikeButtonProps> = ({ likes, onClick }) => {
  return (
    <StyledLikeButton onClick={onClick}>
        <FontAwesomeIcon icon={faHeart} />
        {likes}
    </StyledLikeButton>

  );
};
