import { createContext, useContext, useEffect, useState } from "react";
import { getAuthToken, removeAuthToken, saveAuthToken } from "./lib/utils";
import { useGoogleLogout } from "react-google-login";

const AuthCtx = createContext();

export const AuthWrapper = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!getAuthToken());
  const { signOut } = useGoogleLogout({
    // jsSrc: "https://apis.google.com/js/api.js",
  });

  const handleSetLogin = (token) => {
    saveAuthToken(token);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    removeAuthToken();
    setIsLoggedIn(false);
    signOut();
  };
  return (
    <AuthCtx.Provider value={{ isLoggedIn, handleSetLogin, handleLogout }}>
      {children}
    </AuthCtx.Provider>
  );
};

export const useAuth = () => useContext(AuthCtx);
