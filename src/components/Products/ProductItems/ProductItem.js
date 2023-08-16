import React, { Component } from 'react'
import styles from "./ProductItem.module.css"
import ProductItemForm from '../ProductItemsForm/ProductItemForm'
// import CartContext from '../../../store/cart-context'
import { connect } from 'react-redux'
import { cartSliceActions } from '../../../store/root-reducer'
import { Link } from 'react-router-dom'
class ProductItem extends Component {

  onItemAdd(item) {
    this.props.dispatchFromStore(item);
  }

  render() {
    const price = `$${this.props.item.price.toFixed(2)}`
    const {isEnableAddItem} = this.props;
    return (
      <>
        <li className={styles.item}>
          <div>
            <div><Link to={this.props.item.id}>{this.props.item.name}</Link></div>
            <div className={styles.description}>{this.props.item.description}</div>
            <div className={styles.price}>{price}</div>
          </div>
          {!isEnableAddItem && <div>
            <ProductItemForm {...this.props.item} onItemAdd={this.onItemAdd.bind(this)} />
          </div>
          }
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