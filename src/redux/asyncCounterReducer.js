const INCREASE = "asyncCounter/INCREASE";
const DECREASE = "asyncCounter/DECREASE";
const RESET = "asyncCounter/RESET";

export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });
export const reset = () => ({ type: RESET });

export const asyncIncrease = () => (dispatch) => {
  setTimeout(() => {
    dispatch(increase());
  }, 1000);
};

export const asyncDecrease = () => (dispatch) => {
  setTimeout(() => {
    dispatch(decrease());
  }, 1000);
};

export const asyncReset = () => (dispatch) => {
  setTimeout(() => {
    dispatch(reset());
  }, 1000);
};

const initialState = {
  value: 0,
};

const asyncCounterReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREASE:
      return {
        value: state.value + 1,
      };
    case DECREASE:
      return {
        value: state.value - 1,
      };
    case RESET:
      return {
        value: 0,
      };
    default:
      return state;
  }
};

export default asyncCounterReducer;
