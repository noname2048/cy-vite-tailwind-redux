import { createStore, combineReducers, applyMiddleware } from "redux";
import counterReducer from "#/redux/counterReducer.js";
import todosReducer from "#/redux/todosReducer.js";
import logger from "redux-logger";

const rootReducer = combineReducers({
  counter: counterReducer,
  todos: todosReducer,
});

const store = createStore(rootReducer, applyMiddleware(logger));

export default store;
export { store };
