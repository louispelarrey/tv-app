
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../context/User/UserContext";

interface ProtectedProps {
  children: JSX.Element;
  accessToken: string | null;
}

const Protected = ({ children, accessToken }: ProtectedProps) => {

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
export default Protected;
