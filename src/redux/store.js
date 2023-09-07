import { applyMiddleware, combineReducers, createStore } from "redux";
import counterReducer from "#/redux/counterReducer.js";
import todosReducer from "#/redux/todosReducer.js";
import asyncCounterReducer from "#/redux/asyncCounterReducer.js";
import asyncTodosReducer from "#/redux/asyncTodosReducer.js";
import logger from "redux-logger";
import { composeWithDevTools } from "@redux-devtools/extension";
import ReduxThunk from "redux-thunk";

const rootReducer = combineReducers({
  counter: counterReducer,
  todos: todosReducer,
  asyncCounter: asyncCounterReducer,
  asyncTodos: asyncTodosReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk, logger)),
);

export default store;
export { store };
