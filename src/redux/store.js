import { applyMiddleware, combineReducers, createStore } from "redux";
import counterReducer from "#/redux/counterReducer.js";
import todosReducer from "#/redux/todosReducer.js";
import asyncCounterReducer from "#/redux/asyncCounterReducer.js";
import asyncTodosReducer from "#/redux/asyncTodosReducer.js";
import logger from "redux-logger";
import { composeWithDevTools } from "@redux-devtools/extension";
import ReduxThunk from "redux-thunk";
import postsReducer from "#/redux/postsReducer.js";
import postReducer from "#/redux/postReducer.js";

const rootReducer = combineReducers({
  counter: counterReducer,
  todos: todosReducer,
  asyncCounter: asyncCounterReducer,
  asyncTodos: asyncTodosReducer,
  posts: postsReducer,
  post: postReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk, logger)),
);

export default store;
export { store };
