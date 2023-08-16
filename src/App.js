import React, { useState, useContext } from "react";
import HeaderMenu from "./components/Layout/Header/HeaderMenu";
// import Home from "./components/Home/Home";
import OpenCart from "./components/Cart/OpenCart";
import Login from "./components/Login/Login";
import styles from "./App.module.css";
import CartProvider from "./store/CartProvider";
import AuthContext from "./store/auth-context";
import PageRouterProvider from "./router/PageRouterProvider"
import Filters from "./components/Filters";

const App = () => {
  const useAuthContext = useContext(AuthContext);
  const [isCartOpen, setCartOpen] = useState(false);
  const [isCheckoutFormOpen, setCheckoutFormOpen] = useState(false);

  const onCartClose = () => {
    setCartOpen(false);
  };
  const onCartOpen = () => {
    setCartOpen(true);
  };
  const onCheckoutFormOpen = () => {
    setCheckoutFormOpen((prev) => !prev);
  };

  return (
    <>
      <CartProvider>
        <main className={styles.app}>
          {!useAuthContext.isLoggedIn && <Login />}
          {useAuthContext.isLoggedIn && <HeaderMenu onCartOpen={onCartOpen} />}
          {/* <Home /> */}
          <Filters />
          <PageRouterProvider />
          {isCartOpen && (
            <OpenCart
              onCartClose={onCartClose}
              onCheckoutFormOpen={onCheckoutFormOpen}
              showCehckoutForm={isCheckoutFormOpen}
            />
          )}
        </main>
      </CartProvider>
    </>
  );
};

export default App;
