import React, { useContext, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { createGlobalStyle } from 'styled-components';
import { Menu } from "./components/Menu";
import { UserContext } from "./context/UserContext";
import { Home, Login, Logout } from "./pages";
import { Register } from "./pages/Register";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Montserrat', sans-serif;
  }
`;

export const App = () => {
  const { accessToken } = useContext(UserContext);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if ((!accessToken) && location.pathname !== "/login" && location.pathname !== "/register") {
      navigate("/login");
    } else if ((location.pathname === "/login" || location.pathname === "/register") && accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate, location]);

  return (
    <>
      <Menu />
      <Routes>
        <Route path="/logout" element={<Logout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {accessToken ?
          <>
            <Route path="/watchlist" element={<Home />} />
            <Route path="/" element={<Home />} />
          </>
        : null}
      </Routes>
      <GlobalStyle />

    </>
  );
}

export default App;
