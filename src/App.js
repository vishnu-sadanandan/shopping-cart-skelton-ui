import React, { useState, useCallback, useEffect, useContext } from "react"
import HeaderMenu from "./components/Layout/Header/HeaderMenu"
import Home from "./components/Home/Home";
import Products from "./components/Products/Products"
import WelcomeContent from "./components/Layout/Welcome/WelcomeContent"
import OpenCart from "./components/Cart/OpenCart";
import Login from "./components/Login/Login";

import styles from "./App.module.css";
import CartProvider from "./store/CartProvider";

import useHttp from "./hooks/use-http";
import AuthContext from "./store/auth-context";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { productSliceActions } from "./store/root-reducer";

const apiUrl = "https://react-http-a675e-default-rtdb.firebaseio.com/products.json";

const App = () => {
  const useAuthContext = useContext(AuthContext);
  const [isCartOpen, setCartOpen] = useState(false)
  const [isCheckoutFormOpen, setCheckoutFormOpen] = useState(false)

  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const { isLoading, error, sendHttpRequest: requestProducts } = useHttp();

  const transformedProducts = useCallback((responsedata) => {
    const transformedProducts = [];
    for (const key in responsedata) {
      transformedProducts.push({
        ...responsedata[key],
        id:key
      });
    }
    dispatch(productSliceActions.loadProducts(transformedProducts));
    setProducts(transformedProducts);
  }, [dispatch]);

  const fetchProductsHandler = useCallback(() => {
    requestProducts(
      {
        url: apiUrl,
      },
      transformedProducts
    );
  }, [requestProducts, transformedProducts]);

  useEffect(() => {
    fetchProductsHandler();
  }, [fetchProductsHandler]);

  const onCartClose = () => {
    setCartOpen(false);
  }
  const onCartOpen = () => {
    setCartOpen(true)
  }
  const onCheckoutFormOpen = () => {
    setCheckoutFormOpen((prev) => !prev)
  }

  return (<>
    <CartProvider>
    <main className={styles.app}>
      {!useAuthContext.isLoggedIn && <Login />}
      {useAuthContext.isLoggedIn && <HeaderMenu onCartOpen={onCartOpen} />}
      <Home />
      <WelcomeContent />
      <Outlet/>
        <Products isLoggedIn={useAuthContext.isLoggedIn} items={products} isLoading={isLoading} error={error} />
      {isCartOpen && <OpenCart onCartClose={onCartClose} onCheckoutFormOpen={onCheckoutFormOpen} showCehckoutForm={isCheckoutFormOpen} />}
    </main>
  </CartProvider>
  </>

  );
};

export default App;
