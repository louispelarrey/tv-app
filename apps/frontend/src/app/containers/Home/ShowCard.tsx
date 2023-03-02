import { FC, useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { DeleteButton } from "../../components/DeleteButton/DeleteButton";
import { EditButton } from "../../components/EditButton/EditButton";
import { LikeButton } from "../../components/LikeButton/LikeButton";
import { ServiceContext } from "../../context/Service/ServiceContext";
import { UserContext, UserContextProps } from "../../context/User/UserContext";

export interface ShowCardProps {
  id: number;
  name: string;
  description: string;
  imagePath: string;
  likes: number;
}

const StyleShowCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
  height: 625px;
  border-radius: 5px;
  margin: 10px;
  background-color: white;
  color: #282c34;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border: 1px solid darkgray;

  transition: all 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    box-shadow: 1px 3px 5px 5px rgba(0, 0, 0, 0.5);
  }

  img {
    width: 100%;
    min-height: 400px;
    max-height: 400px;
    object-fit: cover;
    border-bottom: 1px solid black;
    border-radius: 5px 5px 0px 0px;
  }

  .content {
    padding: 10px;
    font-size: 0.8rem;
  }

  .card-footer {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    max-height: 20%;
    position: relative;
    background-color: #f7f5ff;
    border-radius: 0px 0px 5px 5px;
    border-top: 1px solid black;
  }
`;

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
        <EditButton onClick={handleEdit} />
        <DeleteButton onClick={handleDelete} />
      </div>
    </StyleShowCard>
  );
};
