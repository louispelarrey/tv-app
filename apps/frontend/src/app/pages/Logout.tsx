import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export const Logout = () => {
  const { setAccessToken } = useContext(UserContext);

  const logout = () => {
    setAccessToken("");
  }

  return (
    <button onClick={logout}>Logout</button>
  );
};
