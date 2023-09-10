import { delay, put, takeEvery, takeLatest } from "redux-saga/effects";

// action types
const actionTypes = {
  INCREASE: "saga-counter/INCREASE",
  DECREASE: "saga-counter/DECREASE",
  REST: "saga-counter/REST",
  ASYNC_INCREASE: "saga-counter/ASYNC_INCREASE",
  ASYNC_DECREASE: "saga-counter/ASYNC_DECREASE",
  ASYNC_RESET: "saga-counter/ASYNC_RESET",
};

// action creators
const actionCreators = {
  increase: () => ({ type: actionTypes.INCREASE }),
  decrease: () => ({ type: actionTypes.DECREASE }),
  rest: () => ({ type: actionTypes.REST }),
  increaseAsync: () => ({ type: actionTypes.ASYNC_INCREASE }),
  decreaseAsync: () => ({ type: actionTypes.ASYNC_DECREASE }),
  resetAsync: () => ({ type: actionTypes.ASYNC_RESET }),
};

const _sagas = {
  increaseAsync: function* () {
    yield delay(1000);
    yield put(actionCreators.increase());
  },
  decreaseAsync: function* () {
    yield delay(1000);
    yield put(actionCreators.decrease());
  },
};

function* counterSaga() {
  yield takeEvery(actionTypes.ASYNC_INCREASE, _sagas.increaseAsync);
  yield takeLatest(actionTypes.ASYNC_DECREASE, _sagas.decreaseAsync);
}

// initial state
const initialState = 0;

// reducer
const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INCREASE:
      return state + 1;
    case actionTypes.DECREASE:
      return state - 1;
    case actionTypes.REST:
      return 0;
    default:
      return state;
  }
};

export { actionTypes, actionCreators, counterReducer, counterSaga };
export default counterReducer;
