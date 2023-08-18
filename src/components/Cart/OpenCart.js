import styles from "./OpenCart.module.css";
import Modal from "../../UI/Modal/Modal";
import CartItemsTotal from "./CartItemsTotal";
import Checkout from "./Checkout";
import { Link } from "react-router-dom";

const OpenCart = (props) => {
  return (
    <>
      <Modal onClose={props.onCartClose}>
        <CartItemsTotal />
        {props.showCehckoutForm && <Checkout />}
        <div className={styles.actions}>
          <div className={styles.left}>
            <button className={styles["button--alt"]} onClick={props.onCartClose}>
                Close
            </button>
          </div>
          <div className={styles.right}>
            <Link to="/checkout">
              {/* {onClick={props.onCheckoutFormOpen}} */}
            <button className={styles["button"]} >
              {props.showCehckoutForm ? `Cancel` : `Order`}
            </button>
          </Link>
          </div>
          </div>
      </Modal>
    </>
  );
};

export default OpenCart;
