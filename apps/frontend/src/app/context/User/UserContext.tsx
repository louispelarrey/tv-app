import { createContext, Dispatch, FC, ReactNode, SetStateAction, useEffect, useState } from "react";

export interface UserContextProps {
  accessToken: string;
  setAccessToken: Dispatch<SetStateAction<string>>;
}

interface UserProviderProps {
  children: ReactNode;
}

export const UserContext = createContext<UserContextProps>({
  accessToken: "",
  setAccessToken: () => {
    throw new Error("You forgot to wrap your component in <UserProvider>!");
  },
});

export const UserProvider = ({ children }: any) => {
  const [accessToken, setAccessToken] = useState("")

  useEffect(() => {
    const accessTokenStorage = localStorage.getItem("accessToken");

    if (accessTokenStorage && accessTokenStorage !== "undefined") {
      setAccessToken(accessTokenStorage);
    }
  }, [accessToken]);

  return (
    <UserContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </UserContext.Provider>
  );
};
