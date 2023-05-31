import React, { useContext, useEffect, useState } from "react";
import styles from "./HeaderCartButton.module.css";
import CartIcon from "./../../../UI/Icon/CartIcon"
import CartContext from "../../../store/cart-context";
import { useDispatch, useSelector } from "react-redux";

const HeaderCartButton = (props) => {
  // const useCartContext = useContext(CartContext)
  const [isBtnBumper, setBtnBumper] = useState(false);
  const items = useSelector(state => state.cart.items)

  const totalItems = (items && items.reduce((currentNumber, item) => {
    return currentNumber + item.amount;
  }, 0)) || 0;
  const btnClass = `${styles.button} ${isBtnBumper ? styles.bump : ""}`

  useEffect(() => {
    if (items && items.length === 0) {
      return
    }
    setBtnBumper(true)
    const timer = setTimeout(() => {
      setBtnBumper(false);
    }, 300)

    return () => {
      clearTimeout(timer)
    }

  },[items])
  return (
    <>
      <button className={btnClass} onClick={props.onClick}>
        <span className={styles.icon}>
          <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={styles.badge}>{totalItems}</span>
      </button>
    </>
  );
};

export default HeaderCartButton;
