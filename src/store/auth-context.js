import React, { useState, useEffect, useCallback } from "react";
import useHttp from "../hooks/use-http";

const AuthContext = React.createContext({
  isLoggedIn: false,
  token: null,
  onLogout: () => {},
  onLogin: (email, password) => { },
  setToken: (token) => {}
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setUserToken] = useState(null);
  const { isLoading, error, sendHttpRequest: requestLogout } = useHttp();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const onLogout = () => {
    requestLogoutHandler();
  };

  const onLogin = () => {
    localStorage.setItem("isAuthenticated", "1");
    setIsLoggedIn(true);
  };

  const setToken = (token) => {
    localStorage.setItem("TOKEN", token);
    setUserToken(token);
  };

  const responseData = useCallback((data) => {
    localStorage.setItem("isAuthenticated", "0");
    localStorage.removeItem("TOKEN");
    setIsLoggedIn(false);
  }, []);

  const requestLogoutHandler = useCallback(() => {
    requestLogout(
      {
        url: "http://localhost:3000/logout",
        method: "POST",
        body: {},
        headers: {
          'Content-Type': 'application/json',
        },
      },
      responseData
    );
  }, [requestLogout, responseData]);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, onLogin: onLogin, onLogout: onLogout, setToken: setToken, token: token }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
