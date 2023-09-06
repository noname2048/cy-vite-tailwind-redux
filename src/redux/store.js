import { createStore, combineReducers } from "redux";
import counterReducer from "#/redux/counterReducer.js";
import todosReducer from "#/redux/todosReducer.js";

const rootReducer = combineReducers({
  counter: counterReducer,
  todos: todosReducer,
});

const store = createStore(rootReducer);

export default store;
export { store };
