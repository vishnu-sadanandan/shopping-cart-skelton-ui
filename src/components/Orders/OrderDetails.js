import React from 'react'
// import styles from "./ProductItem.module.css"
import Card from '../../UI/Card/Card';
import ProductItem from '../Products/ProductItems/ProductItem';

const OrderItem = (props) => {
  const { order, user, id: orderId } = props
  return (
    <>
      <li className={""}>
        <div>
          <div>{orderId}</div>
          {order.map(product => {
            return (
              <Card>
              <ul>
                  <ProductItem key={product.id} item={product} isEnableAddItem={true} />
              </ul>
              </Card>
            )
          })}
        </div>
        <br />
        <div>
          <div>{user.address}</div>
        </div>
      </li>
    </>
  );
}

export default OrderItem;