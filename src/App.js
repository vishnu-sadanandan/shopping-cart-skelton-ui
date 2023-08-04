import React, { useState, useContext } from "react";
import HeaderMenu from "./components/Layout/Header/HeaderMenu";
import Home from "./components/Home/Home";
import Products from "./components/Products/Products";
import WelcomeContent from "./components/Layout/Welcome/WelcomeContent";
import OpenCart from "./components/Cart/OpenCart";
import Login from "./components/Login/Login";
import styles from "./App.module.css";
import CartProvider from "./store/CartProvider";
import AuthContext from "./store/auth-context";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductDetails from "./components/Products/ProductDetails";
import Page from "./components";

  const routerConfig = createBrowserRouter([
    {
      path: '/',
      element: <Page />,
      children: [
        {
          index: true,
          element: <Products />,
        },
        {
          path: '/:productId',
          element: <ProductDetails />,
        }
      ],
    },
  ]);



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
          <Home />
          <WelcomeContent />
          <RouterProvider router={routerConfig} />
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
