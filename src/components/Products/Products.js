import React from "react";
import ProductItem from "./ProductItems/ProductItem";
import styles from "./Products.module.css"
import Card from "../../UI/Card/Card";

const Products = (props) => {
  return (
    <section className={styles.meals}>
      <Card isLoading={props.isLoading} isLoggedIn={props.isLoggedIn}>
        <ul>
          {props.items.length > 0 && props.items.map((item) => {
            return <ProductItem key={item.id} item={item} />;
          })}
          {props.items.length === 0 && <li>No products found!</li>}
        </ul>
      </Card>
    </section>
  );
};

export default Products;
