const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";
const RESET = "counter/RESET";

export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });
export const reset = () => ({ type: RESET });

const initialState = {
  counter: {
    value: 0,
  },
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREASE:
      return {
        ...state,
        counter: {
          value: state.counter.value + 1,
        },
      };
    case DECREASE:
      return {
        ...state,
        counter: {
          value: state.counter.value - 1,
        },
      };
    case RESET:
      return {
        ...state,
        counter: {
          value: 0,
        },
      };
    default:
      return state;
  }
};

export default counterReducer;
