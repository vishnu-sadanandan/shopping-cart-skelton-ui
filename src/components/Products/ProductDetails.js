import React from 'react';
import { useSelector } from 'react-redux';
import {useParams} from 'react-router-dom';

const ProductDetails = () => {
    const {productId} = useParams()
    const product = useSelector(state => state.product.items.find(product => product.id === productId))
    return (<>
        <div>
            {`Product name : ${product.name}`}
        </div>
    </>);
}

export default React.memo(ProductDetails);