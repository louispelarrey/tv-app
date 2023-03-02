import styled from "styled-components";

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

export { StyleShowCard };
