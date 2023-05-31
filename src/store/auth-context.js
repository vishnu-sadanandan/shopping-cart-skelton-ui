import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const onLogout = () => {
    localStorage.setItem("isAuthenticated", "0");
    setIsLoggedIn(false);
  };

  const onLogin = () => {
    localStorage.setItem("isAuthenticated", "1");
    setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, onLogin: onLogin, onLogout: onLogout }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
