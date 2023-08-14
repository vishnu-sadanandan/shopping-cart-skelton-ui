import React, {useContext, useEffect} from "react";
import ProductItem from "./ProductItems/ProductItem";
import styles from "./Products.module.css"
import Card from "../../UI/Card/Card";
import { useDispatch, useSelector } from "react-redux";
import AuthContext from "../../store/auth-context";
import { productSliceActions } from "../../store/root-reducer";

// implemented both saga and useHttp hook for API requests

const Products = () => {

  const products = useSelector(state => state).product.items;
  const isLoading = useSelector(state => state).product.isLoading;
  const useAuthContext = useContext(AuthContext);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productSliceActions.setProductRequestLoading()); // saga watchers are listening to this action
  }, [dispatch]);


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
