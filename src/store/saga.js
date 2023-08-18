import { all } from 'redux-saga/effects';
import {watchProductFetch, watchProductSearch, } from "../store/sagas/products"
import watchOrderFetch from "../store/sagas/orders";
// Export the root saga
export default function* rootSaga() {
  yield all([
    watchProductFetch(),
    watchProductSearch(),
    watchOrderFetch()
  ]);
}