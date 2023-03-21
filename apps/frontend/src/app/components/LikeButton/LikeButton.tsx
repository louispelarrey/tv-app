import { FC, MouseEventHandler } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { StyledLikeButton } from "./LikeButton.style";

interface LikeButtonProps {
  likes: number;
  name: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const LikeButton: FC<LikeButtonProps> = ({ likes, name, onClick }) => {
  return (
    <StyledLikeButton onClick={onClick} name={name} data-testid="like-button" data-cy="like-button">
        {likes}
        <FontAwesomeIcon data-testid="heart-icon" icon={faHeart} />
    </StyledLikeButton>
  );
};
