import { call, put, select, takeEvery } from "redux-saga/effects";
import { productSliceActions, productSliceActionsTypes } from "../root-reducer";

const apiUrl =
  "https://react-http-a675e-default-rtdb.firebaseio.com/products.json";
async function fetchProducts() {
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`"Something went wrong!" ${error}`);
  }
}

function* setProducts(action) {
  try {
    const data = yield call(fetchProducts);
    const transformedProducts = [];
    if (data) {
      for (const key in data) {
        transformedProducts.push({
          ...data[key],
          id: key,
        });
      }
    }
    yield put(productSliceActions.setProducts(transformedProducts));
    yield put(productSliceActions.setProductRequestCompleted());
  } catch (error) {
    // yield put(fetchDataFailure(error.message));
  }
}

function* setSearchProducts(action) {
  const term = action.payload;
  const state = yield select();
  const products = state.product.items;
  let filteredProducts =
    term !== ""
      ? products.filter((product) =>
          product.name.toLowerCase().includes(term.toLowerCase())
        )
      : products;
  yield put(productSliceActions.setFilteredProducts(filteredProducts));
  yield put(productSliceActions.setProductRequestSearchCompleted());
}

export function* watchProductFetch() {
  yield takeEvery(
    `${productSliceActionsTypes}/setProductRequestLoading`,
    setProducts
  );
}

export function* watchProductSearch() {
  yield takeEvery(
    `${productSliceActionsTypes}/setProductRequestSearch`,
    setSearchProducts
  );
}
