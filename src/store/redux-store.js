import {cartSliceReducer, productSliceReducer, userSliceReducer} from "./root-reducer";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {cart: cartSliceReducer, user: userSliceReducer, product: productSliceReducer}
});

export default store;

