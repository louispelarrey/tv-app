import { useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeleteButton } from "../../../components/DeleteButton/DeleteButton";
import { EditButton } from "../../../components/EditButton/EditButton";
import { LikeButton } from "../../../components/LikeButton/LikeButton";
import { ServiceContext } from "../../../context/Service/ServiceContext";
import { UserContext, UserContextProps } from "../../../context/User/UserContext";
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
    <StyleShowCard>
      <div onClick={handleCardClick}>
        <img src={imagePath} alt={name} />
        <div className="content">
          <h2>{name}</h2>
          <p>{description}</p>
        </div>
      </div>
      <div className="card-footer">
        <LikeButton name="like-icon" likes={likeNumber} onClick={handleLike} />
        <EditButton onClick={handleEdit} data-testid="like-button" />
        <DeleteButton onClick={handleDelete} data-testid="delete-button" />
      </div>
    </StyleShowCard>
  );
};
