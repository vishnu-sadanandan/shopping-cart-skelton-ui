import React, { useReducer } from "react";
import CartContext from "./cart-context";
import cartReducer from "./root-reducer";
const defaultState = {
  items: [],
  totalAmount: 0,
};
const CartProvider = (props) => {
  const [cartState, cartDispatchAction] = useReducer(cartReducer, defaultState);

  const addItemToCart = (item) => {
    // @ts-ignore
    cartDispatchAction({ type: "ADD_ITEM", payload: item });
  };
  const removeItemFromCart = (id) => {
    // @ts-ignore
    cartDispatchAction({ type: "REMOVE_ITEM", payload: id });
  };
  const cartContextDefault = {
    ...cartState,
    addItem: addItemToCart,
    removeItem: removeItemFromCart,
  };
  return (
    <CartContext.Provider value={cartContextDefault}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
