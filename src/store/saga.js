import { call, put, takeEvery } from 'redux-saga/effects';
import { productSliceActions, productSliceActionsTypes } from "./root-reducer"

const apiUrl = "https://react-http-a675e-default-rtdb.firebaseio.com/products.json";
// Simulated API function
async function fetchProducts() {

    try {
        const response = await fetch(
            apiUrl,
            {
                method: "GET"
            }
        );
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error(`"Something went wrong!" ${error}`);
      }

}

// Worker Saga: Handles the actual API call and dispatches success or failure actions
function* setProducts() {
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

// Watcher Saga: Listens for FETCH_DATA_REQUEST action and triggers fetchDataSaga
function* watchFetchData() {
  yield takeEvery(`${productSliceActionsTypes}/setProductRequestLoading`, setProducts);
}

// Export the root saga
export default function* rootSaga() {
  yield watchFetchData();
}
