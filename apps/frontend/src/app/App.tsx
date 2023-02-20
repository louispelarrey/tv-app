import React, { useContext, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { createGlobalStyle } from 'styled-components';
import { Menu } from "./components/Menu";
import { UserContext } from "./context/UserContext";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Logout } from "./pages/Logout";

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
    if (!accessToken && location.pathname !== "/login") {
      navigate("/login");
    } else if (location.pathname === "/login" && accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate, location]);

  return (
    <>
      <Menu />
      <Routes>
        <Route path="/logout" element={<Logout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <GlobalStyle />

    </>
  );
}

export default App;
