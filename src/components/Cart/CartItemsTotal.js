import React from "react";
import styles from "./OpenCart.module.css";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { cartSliceActions } from '../../store/root-reducer'

const OpenCart = () => {

  const dispatchFromStore = useDispatch();

  const onItemAdd = (item) => {
    // useCartContext.addItem({ ...item, amount: 1 });
    // dispatchFromStore({ type: "ADD_ITEM", payload: { ...item, amount: 1 } })
    dispatchFromStore(cartSliceActions.addItem({ ...item, amount: 1 }));
  };
  const onItemRemove = (id) => {
    // useCartContext.removeItem(id);
    // dispatchFromStore({ type: "REMOVE_ITEM", payload: id });
    dispatchFromStore(cartSliceActions.removeItem(id));

  };
  const totalAmount = useSelector(state => state.cart.totalAmount);
  const storeProducts = useSelector(state => state.cart.items);
  // console.log(dispatchFromStore(cartSliceActions.getItems()))
  return (
    <>
      {storeProducts.map((item) => (
        <CartItem
          key={item.id}
          {...item}
          onAdd={onItemAdd.bind(null, item)}
          onRemove={onItemRemove.bind(null, item.id)}
        />
      ))}

      <div className={styles.total}>
        <span>Total</span>
        <span>${totalAmount.toFixed(2)}</span>
      </div>
    </>
  );
};

export default OpenCart;
