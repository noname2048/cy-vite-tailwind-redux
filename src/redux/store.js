import { applyMiddleware, combineReducers, createStore } from "redux";
import counterReducer from "#/redux/counterReducer.js";
import todosReducer from "#/redux/todosReducer.js";
import asyncCounterReducer from "#/redux/asyncCounterReducer.js";
import asyncTodosReducer from "#/redux/asyncTodosReducer.js";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "@redux-devtools/extension";
import ReduxThunk from "redux-thunk";
import postsReducer from "#/redux/postsReducer.js";
import postReducer from "#/redux/postReducer.js";
import { createBrowserHistory } from "history";

const customHistory = createBrowserHistory();
const customLogger = createLogger({
  collapsed: false,
});

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
  composeWithDevTools(
    applyMiddleware(
      ReduxThunk.withExtraArgument({ history: customHistory }),
      customLogger,
    ),
  ),
);

export default store;
export { store };
