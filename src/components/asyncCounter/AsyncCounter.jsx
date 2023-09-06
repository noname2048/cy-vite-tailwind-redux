import { useDispatch, useSelector } from "react-redux";
import {
  asyncIncrease,
  asyncDecrease,
  asyncReset,
} from "#/redux/asyncCounterReducer.js";
import PropTypes from "prop-types";

export default function AsyncCounterContainer() {
  const { value } = useSelector((state) => state.asyncCounter);
  const dispatch = useDispatch();

  return (
    <div>
      <Counter value={value} dispatch={dispatch} />
    </div>
  );
}

function Counter({ value, dispatch }) {
  return (
    <div>
      <div>
        <button
          className="m-2 p-1 border rounded-md"
          onClick={() => {
            dispatch(asyncIncrease());
          }}
        >
          increase
        </button>
        <span className="m-2 text-bold">{value}</span>
        <button
          className="m-2 p-1 border rounded-md"
          onClick={() => {
            dispatch(asyncDecrease());
          }}
        >
          decrease
        </button>
      </div>
      <button
        className="border border-red-400 rounded-md m-2 p-2"
        onClick={() => {
          dispatch(asyncReset());
        }}
      >
        reset
      </button>
    </div>
  );
}

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};
