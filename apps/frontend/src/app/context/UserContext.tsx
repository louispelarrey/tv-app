import { createContext, Dispatch, FC, ReactNode, SetStateAction, useEffect, useState } from "react";

interface UserContextProps {
  accessToken: string;
  setAccessToken: Dispatch<SetStateAction<string>>;
}

export const UserContext = createContext<UserContextProps>({
  accessToken: "",
  setAccessToken: () => {
    throw new Error("You forgot to wrap your component in <UserProvider>!");
  },
});

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState("")

  //Stores the accessToken in a cookie when it changes
  useEffect(() => {
    document.cookie = `accessToken=${accessToken}; path=/; secure; httponly`;
  }, [accessToken]);

  if(accessToken == "") {
    const cookies = document.cookie.split(";").map(cookie => cookie.trim());
    const accessTokenCookie = cookies.find(cookie => cookie.startsWith("accessToken="));
    if(accessTokenCookie) {
      const accessTokenValue = accessTokenCookie.split("=")[1];
      setAccessToken(accessTokenValue);
      console.log("accessToken", accessTokenValue)

    }
  }

  return (
    <UserContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </UserContext.Provider>
  );
};
