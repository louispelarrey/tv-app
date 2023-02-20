import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from '../context/UserContext';
const StyledMenu = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: #282c34;
  min-height: 10vh;
  color: white;
  padding: 0px;
  margin: 0px;
  a {
    color: white;
    text-decoration: none;
    font-size: 1.2rem;
  }
  a:hover {
    color: #8393ed;
  }
`;

export function Menu() {
  const {accessToken} = useContext(UserContext);

  return (
    <StyledMenu>
      {!accessToken ?
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
        :
        <>
          <Link to="/">Home</Link>
          <Link to="/logout">Logout</Link>
        </>
      }
    </StyledMenu>
  );
}
