
import { Navigate } from "react-router-dom";

interface ProtectedProps {
  children: JSX.Element;
  accessToken: string | null;
}

export const Protected = ({ children, accessToken }: ProtectedProps) => {

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
