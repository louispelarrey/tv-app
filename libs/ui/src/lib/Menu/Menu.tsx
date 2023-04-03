import { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from '@tv-app/utility';

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
          <Link to="/login">Connexion</Link>
          <Link to="/register">S'inscrire</Link>
        </>
        :
        <>
          <Link to="/">Séries</Link>
          <Link to="/watchlist">Watchlist</Link>
          <Link to="/logout">Déconnexion</Link>
        </>
      }
    </StyledMenu>
  );
}
