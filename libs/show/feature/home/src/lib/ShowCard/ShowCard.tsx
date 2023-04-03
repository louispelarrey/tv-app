import { useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LikeButton, EditButton, DeleteButton } from "@tv-app/ui";
import { UserContext, UserContextProps, ServiceContext } from "@tv-app/utility";
import { StyleShowCard } from "./ShowCard.style";

export interface ShowCardProps {
  id: number;
  name: string;
  description: string;
  imagePath: string;
  likes: number;
}

export const ShowCard = ({ id, name, description, likes, imagePath }: ShowCardProps) => {

  const [likeNumber, setLikeNumber] = useState<number>(likes);
  const navigate = useNavigate();

  const {accessToken} = useContext<UserContextProps>(UserContext);
  const {
    services: {
      ShowService,
    }
  } = useContext(ServiceContext);

  const fetchToggleFollow = useCallback(async (id: number): Promise<void> => {
    const res = await ShowService.toggleFollowShow(id, accessToken);
    res.add ? setLikeNumber(likeNumber + 1) : setLikeNumber(likeNumber - 1);

  }, [ShowService, accessToken, likeNumber]);

  const fetchDeleteShow = useCallback(async (id: number): Promise<void> => {
    await ShowService.deleteShow(id, accessToken);
    navigate("/");
  }, [ShowService, accessToken, navigate]);

  const handleCardClick = useCallback(() => navigate(`/show/${id}`), [navigate, id]);
  const handleLike = useCallback(() => fetchToggleFollow(id), [fetchToggleFollow, id]);
  const handleDelete = useCallback(() => fetchDeleteShow(id), [fetchDeleteShow, id]);
  const handleEdit = useCallback(() => navigate(`/edit/${id}`), [navigate, id]);

  return (
    <StyleShowCard data-cy="show-card">
      <div onClick={handleCardClick}>
        <img src={imagePath} alt={name} />
        <div className="content">
          <h2 data-cy="show-card-name">{name}</h2>
          <p>{description}</p>
        </div>
      </div>
      <div className="card-footer">
        <LikeButton name="like-icon" likes={likeNumber} onClick={handleLike} />
        <EditButton onClick={handleEdit} />
        <DeleteButton onClick={handleDelete} data-testid="delete-button" />
      </div>
    </StyleShowCard>
  );
};
