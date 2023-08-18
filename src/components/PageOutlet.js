import { Outlet } from "react-router-dom";
import Login from "./Login/Login";
import HeaderMenu from "./Layout/Header/HeaderMenu";
import OpenCart from "./Cart/OpenCart";
import { useContext, useState } from "react";
import AuthContext from "../store/auth-context";
import Filters from "./Filters";

const PageOutlet = () => {
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
      {!useAuthContext.isLoggedIn && <Login />}
      {useAuthContext.isLoggedIn && <HeaderMenu onCartOpen={onCartOpen} />}
      <Filters />

      {isCartOpen && (
        <OpenCart
          onCartClose={onCartClose}
          onCheckoutFormOpen={onCheckoutFormOpen}
          showCehckoutForm={isCheckoutFormOpen}
        />
      )}
      <Outlet />
    </>
  );
};

export default PageOutlet;
