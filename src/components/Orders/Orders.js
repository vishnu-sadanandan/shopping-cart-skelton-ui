import React, {useContext, useEffect} from "react";
import styles from "./Orders.module.css"
import Card from "../../UI/Card/Card";
import { useDispatch, useSelector } from "react-redux";
import AuthContext from "../../store/auth-context";
import { orderSliceActions } from "../../store/root-reducer";
import OrderItem from "./OrderDetails";

const Orders = () => {

  const orders = useSelector(state => state).order;
  const isLoading = useSelector(state => state).order.isLoading;
  const useAuthContext = useContext(AuthContext);
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(orderSliceActions.setOrderRequestLoading()); // saga watchers are listening to this action
  }, [dispatch]);

 const orderList = orders.order.length > 0 && orders.order.map((item) => <OrderItem key={item.id} {...item} />)
  return (
    <section className={styles.meals}>
      <Card isLoading={isLoading} isLoggedIn={useAuthContext.isLoggedIn}>
        <ul>
        {orderList}
        {orders.order.length === 0 && <li>No orders found!</li>}
        </ul>
      </Card>
    </section>
  );
};

export default Orders;
