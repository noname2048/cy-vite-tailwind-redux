const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";
const RESET = "counter/RESET";

export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });
export const reset = () => ({ type: RESET });

const initialState = {
  value: 0,
};

const counterReducer = (state = initialState, action) => {
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

export default counterReducer;
