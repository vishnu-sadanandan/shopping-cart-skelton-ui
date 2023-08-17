import React, {useContext, useEffect, useState} from "react";
import ProductItem from "./ProductItems/ProductItem";
import styles from "./Products.module.css"
import Card from "../../UI/Card/Card";
import { useDispatch, useSelector } from "react-redux";
import AuthContext from "../../store/auth-context";
import { productSliceActions } from "../../store/root-reducer";

// implemented both saga and useHttp hook for API requests

const Products = () => {

  const products = useSelector(state => state).product.items;
  const term = useSelector(state => state).product.searchTerm;
  const isLoading = useSelector(state => state).product.isLoading;
  const useAuthContext = useContext(AuthContext);
  const dispatch = useDispatch();
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    dispatch(productSliceActions.setProductRequestLoading()); // saga watchers are listening to this action
  }, [dispatch]);

  useEffect(() => {
    let filteredProducts = term !== "" ? products.filter((product) =>
    product.name.toLowerCase().includes(term.toLowerCase())
    ) : products;
    setFilteredProducts(filteredProducts)
  }, [products, term]);

  return (
    <section className={styles.meals}>
      <Card isLoading={isLoading} isLoggedIn={useAuthContext.isLoggedIn}>
        <div className={`${styles.productGridContainer}`}>
          <ul className={styles.productGrid}>
            {filteredProducts.length > 0 && filteredProducts.map((item) => {
              return <ProductItem key={item.id} item={item} />;
            })}
            {filteredProducts.length === 0 && <li>No products found!</li>}
          </ul>
        </div>
      </Card>
    </section>
  );
};

export default Products;
