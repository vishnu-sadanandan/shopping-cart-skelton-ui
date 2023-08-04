import React, { useCallback, useContext, useEffect, useState } from "react";
import ProductItem from "./ProductItems/ProductItem";
import styles from "./Products.module.css"
import Card from "../../UI/Card/Card";
import { useDispatch, useSelector } from "react-redux";
import AuthContext from "../../store/auth-context";
import useHttp from "../../hooks/use-http";
import { productSliceActions } from "../../store/root-reducer";

const apiUrl =
  "https://react-http-a675e-default-rtdb.firebaseio.com/products.json";


// implemented both saga and useHttp hook for API requests

const Products = () => {

  // const products = useSelector(state => state).product.items;
  // const isLoading = useSelector(state => state).product.isLoading;

  const useAuthContext = useContext(AuthContext);

  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const { isLoading, error, sendHttpRequest: requestProducts } = useHttp();

  const transformedProducts = useCallback(
    (responsedata) => {
      const transformedProducts = [];
      for (const key in responsedata) {
        transformedProducts.push({
          ...responsedata[key],
          id: key,
        });
      }
      dispatch(productSliceActions.setProducts(transformedProducts));
      dispatch(productSliceActions.setProductRequestCompleted());
      setProducts(transformedProducts);
    },
    [dispatch]
  );

  const fetchProductsHandler = useCallback(() => {
    requestProducts(
      {
        url: apiUrl,
      },
      transformedProducts
    );
  }, [requestProducts, transformedProducts]);

  useEffect(() => {
    fetchProductsHandler();
    dispatch(productSliceActions.setProductRequestLoading()); // saga watchers are listening to this action
  }, [dispatch, fetchProductsHandler]);


  return (
    <section className={styles.meals}>
      <Card isLoading={isLoading} isLoggedIn={useAuthContext.isLoggedIn}>
        <ul>
          {products.length > 0 && products.map((item) => {
            return <ProductItem key={item.id} item={item} />;
          })}
          {products.length === 0 && <li>No products found!</li>}
        </ul>
      </Card>
    </section>
  );
};

export default Products;
