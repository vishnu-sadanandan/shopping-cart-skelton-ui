import {cartSliceReducer, orderSliceReducer, productSliceReducer, userSliceReducer} from "./root-reducer";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga'
import rootSaga from './saga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore(
    {
        reducer: { cart: cartSliceReducer, user: userSliceReducer, product: productSliceReducer, order: orderSliceReducer },
        middleware: [sagaMiddleware]
    },
);

sagaMiddleware.run(rootSaga);

export default store;

