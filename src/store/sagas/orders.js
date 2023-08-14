import { call, put, takeEvery } from 'redux-saga/effects';
import { orderSliceActions, orderSliceActionsTypes } from "../root-reducer"

const apiUrl = "https://react-http-a675e-default-rtdb.firebaseio.com/order.json";
// Simulated API function
async function fetchOrders() {

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
function* setOrders() {
  try {
    const data = yield call(fetchOrders);
    const transformedOrders = [];

    if (data) {
      for (const key in data) {
        transformedOrders.push({
          ...data[key],
          id: key,
        });
      }
      }
    yield put(orderSliceActions.setOrders(transformedOrders));
    yield put(orderSliceActions.setOrderRequestCompleted());
  } catch (error) {
    // yield put(fetchDataFailure(error.message));
  }
}

// Watcher Saga: Listens for FETCH_DATA_REQUEST action and triggers fetchDataSaga
function* watchOrderFetch() {
  yield takeEvery(`${orderSliceActionsTypes}/setOrderRequestLoading`, setOrders);
}

export default watchOrderFetch;