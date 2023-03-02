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

  //Stores the accessToken in a cookie when it changes
  useEffect(() => {
    const localStorageAccessToken = localStorage.getItem("accessToken");

    if (localStorageAccessToken) {
      setAccessToken(() => localStorageAccessToken);
    }

    localStorage.setItem("accessToken", accessToken);

  }, [accessToken]);

  return (
    <UserContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </UserContext.Provider>
  );
};
