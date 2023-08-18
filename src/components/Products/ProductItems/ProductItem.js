import React, { Component } from 'react'
import styles from "./ProductItem.module.css"
import ProductItemForm from '../ProductItemsForm/ProductItemForm'
import { connect } from 'react-redux'
import { cartSliceActions } from '../../../store/root-reducer'
import { Link } from 'react-router-dom'
import { Card, CardHeader, CardBody, CardFooter,Image } from "@nextui-org/react";

class ProductItem extends Component {

  onItemAdd(item) {
    this.props.dispatchFromStore(item);
  }

  render() {
    const price = `$${this.props.item.price.toFixed(2)}`
    const { isEnableAddItem } = this.props;
    return (
      <>
        <li className={styles.item}>
          <div>
          <Card className="py-4">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <p className="text-tiny uppercase font-bold"><Link to={this.props.item.id}>{this.props.item.name}</Link></p>
              <small className="text-default-500">{this.props.item.description}</small>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <Image
                width={300}
                alt="NextUI hero Image"
                src="https://img.freepik.com/premium-photo/manchurian-hakka-schezwan-noodles-popular-indochinese-food-served-bowl_466689-46524.jpg?w=360"
              />
              </CardBody>
              <CardFooter className="text-small justify-between">
                <b>{price}</b>
                <p className="text-default-500">
                  {!isEnableAddItem && <ProductItemForm {...this.props.item} onItemAdd={this.onItemAdd.bind(this)} />}
                </p>
              </CardFooter>
          </Card>
          </div>
        </li>
      </>
    );
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchFromStore: (item) => {
      return dispatch(cartSliceActions.addItem(item))
    }
  }
}

export default connect(null, mapDispatchToProps)(ProductItem);

// const ProductItem = (props) => {
//   const { item: product } = props
//   const price = `$${product.price.toFixed(2)}`
//   // const useCartContext = useContext(CartContext)
//   const onItemAdd = item => {
//     // useCartContext.addItem(item)
//     dispatchFromStore({ type: "ADD_ITEM", payload: item });
//   }
//   const dispatchFromStore = useDispatch();

//     return (
//       <>
//         <li className={styles.item}>
//           <div>
//             <div>{product.name}</div>
//             <div className={styles.description}>{product.description}</div>
//             <div className={styles.price}>{price}</div>
//           </div>
//           <div>
//             <ProductItemForm {...product} onItemAdd={onItemAdd} />
//           </div>
//         </li>
//       </>
//     );
// }

// export default ProductItem;