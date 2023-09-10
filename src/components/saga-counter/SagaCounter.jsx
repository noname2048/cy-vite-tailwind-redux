import { actionCreators } from "#/redux/saga/counterReducer.js";
import { useDispatch, useSelector } from "react-redux";

export default function SagaCounter() {
  return <CounterContainer />;
}

function CounterContainer() {
  const count = useSelector((state) => state.sagaCounter);
  const dispatch = useDispatch();

  return (
    <div>
      <button
        onClick={() => {
          dispatch(actionCreators.increaseAsync());
        }}
      >
        UP
      </button>
      <h1>{count}</h1>
      <button
        onClick={() => {
          dispatch(actionCreators.decreaseAsync());
        }}
      >
        DOWN
      </button>
    </div>
  );
}
