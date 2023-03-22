import { useContext, useEffect, lazy } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { createGlobalStyle } from 'styled-components';
import { Menu } from "./layouts/Menu/Menu";
import { UserContext } from "./context/User/UserContext";
import { ShowDetails } from "./containers/ShowDetails/ShowDetails";
import Protected from "./containers/Protected/Protected";

const Home = lazy(() => import('./containers/Home/Home').then(module => ({ default: module.Home })));
const Login = lazy(() => import('./containers/Login/Login').then(module => ({ default: module.Login })));
const Logout = lazy(() => import('./containers/Logout/Logout').then(module => ({ default: module.Logout })));
const Register = lazy(() => import('./containers/Register/Register').then(module => ({ default: module.Register })));
const Watchlist = lazy(() => import('./containers/Watchlist/Watchlist').then(module => ({ default: module.Watchlist })));

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
    if (accessToken) {
      const token = JSON.parse(atob(accessToken.split(".")[1]));
      const expiration = new Date(token.exp * 1000);
      const now = new Date();
      if (expiration < now) {
        navigate("/logout");
      }
    }
  }, [accessToken, navigate, location]);

  return (
    <>
      <Menu />
      <Routes>
        <Route path="/logout" element={<Logout />} />
        <Route path="/login" element={<Login />} />²
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Protected accessToken={localStorage.getItem("accessToken")}><Home/></Protected>} />
        <Route path="/show/:id" element={<Protected accessToken={localStorage.getItem("accessToken")}><ShowDetails /></Protected>} />
        <Route path="/watchlist" element={<Protected accessToken={localStorage.getItem("accessToken")}><Watchlist /></Protected>} />
      </Routes>
      <GlobalStyle />

    </>
  );
}

export default App;
