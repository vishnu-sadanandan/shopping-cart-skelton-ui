import styles from "./OpenCart.module.css";
import Modal from "../../UI/Modal/Modal";
import CartItemsTotal from "./CartItemsTotal";
import Checkout from "./Checkout";

const OpenCart = (props) => {
  return (
    <>
      <Modal onClose={props.onCartClose}>
        <CartItemsTotal />
        {props.showCehckoutForm && <Checkout />}
        <div className={styles.actions}>
          <button className={styles["button--alt"]} onClick={props.onCartClose}>
            Close
          </button>
          <button className={styles["button"]} onClick={props.onCheckoutFormOpen}>{props.showCehckoutForm ? `Cancel` : `Order`}</button>
        </div>
      </Modal>
    </>
  );
};

export default OpenCart;
