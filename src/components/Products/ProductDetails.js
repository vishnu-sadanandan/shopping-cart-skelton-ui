import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "./Products.module.css";
import Card from "../../UI/Card/Card";
import ProductItem from "./ProductItems/ProductItem";

const ProductDetails = () => {
  const { productId } = useParams();
  const product = useSelector((state) =>
    state.product.items.find((product) => product.id === productId)
  );
  return (
    <>
      <section className={styles.meals}>
        <Card>
          <ul>
            <ProductItem key={product.id} item={product} />
          </ul>
        </Card>
      </section>
    </>
  );
};

export default React.memo(ProductDetails);
