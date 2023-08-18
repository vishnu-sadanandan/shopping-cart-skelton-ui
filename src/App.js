import React, { useState, useContext } from "react";
import HeaderMenu from "./components/Layout/Header/HeaderMenu";
import OpenCart from "./components/Cart/OpenCart";
import Login from "./components/Login/Login";
import styles from "./App.module.css";
import CartProvider from "./store/CartProvider";
import AuthContext from "./store/auth-context";
import PageRouterProvider from "./router/PageRouterProvider"
import Filters from "./components/Filters";

const App = () => {
  return (
    <>
      <CartProvider>
        <main className={styles.app}>
          <PageRouterProvider />
        </main>
      </CartProvider>
    </>
  );
};

export default App;
