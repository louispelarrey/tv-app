import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "@tv-app/utility";

export const Logout = () => {
  const { setAccessToken } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    setAccessToken("");
    localStorage.removeItem("accessToken");
    navigate("/login");
  }, [navigate, setAccessToken])

  return (
    <p>Deconnexion en cours</p>
  );
};
