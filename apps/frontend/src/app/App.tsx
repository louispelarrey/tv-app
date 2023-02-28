import { useContext, useEffect, lazy } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { createGlobalStyle } from 'styled-components';
import { Menu } from "./components/Menu";
import { UserContext } from "./context/UserContext";

const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const Login = lazy(() => import('./pages/Login').then(module => ({ default: module.Login })));
const Logout = lazy(() => import('./pages/Logout').then(module => ({ default: module.Logout })));
const Register = lazy(() => import('./pages/Register').then(module => ({ default: module.Register })));
const Watchlist = lazy(() => import('./pages/Watchlist').then(module => ({ default: module.Watchlist })));

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
        <Route path="/login" element={<Login />} />²
        <Route path="/register" element={<Register />} />

        {accessToken ?
          <>
            <Route path="/" element={<Home />} />
            <Route path="/watchlist" element={<Watchlist />} />
          </>
        : null}
      </Routes>
      <GlobalStyle />

    </>
  );
}

export default App;
