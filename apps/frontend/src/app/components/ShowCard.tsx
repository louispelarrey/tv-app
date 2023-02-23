import { FC, useCallback, useState } from "react";
import styled from "styled-components";
import { LikeButton } from "./LikeButton";

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
  height: 600px;
  border: 1px solid black;
  border-radius: 5px;
  margin: 10px;

  transition: all 0.3s ease-in-out;

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
    justify-content: center;
    align-items: center;
    max-height: 15%;
    border-top: 1px solid black;
    position: relative;
    background-color: #f5f5f5;
  }
`;

export const ShowCard: FC<ShowCardProps> = ({ id, name, description, likes, imagePath }: ShowCardProps) => {

  const [likeNumber, setLikeNumber] = useState<number>(likes);

  const handleLike = (id: number) => {
    try {
      fetchToggleFollow(id);
    } catch (error) {
      console.log(error)
    }
  }

  const fetchToggleFollow = useCallback(async (id: number): Promise<void> => {
    const req = await fetch(`${process.env.NX_SERVER_URL}/api/show/follow/${id}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    const res = await req.json();
    if(res.add) {
      setLikeNumber(likeNumber + 1);
    } else {
      setLikeNumber(likeNumber - 1);
    }
  }, [likeNumber]);

  return (
    <StyleShowCard>
      <img src={imagePath} alt={name} />
      <div className="content">
        <h2>{name}</h2>
        <p>{description}</p>
      </div>
      <div className="card-footer">
        <LikeButton name="like-button" likes={likeNumber} onClick={() => handleLike(id)} />
      </div>
    </StyleShowCard>
  );
};
