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
import createSagaMiddleware from "redux-saga";
import {
  counterSaga,
  counterReducer as sagaCounterReducer,
} from "#/redux/saga/counterReducer.js";
import { all } from "redux-saga/effects";

const rootReducer = combineReducers({
  counter: counterReducer,
  todos: todosReducer,
  asyncCounter: asyncCounterReducer,
  asyncTodos: asyncTodosReducer,
  posts: postsReducer,
  post: postReducer,
  sagaCounter: sagaCounterReducer,
});

const sagaMiddleware = createSagaMiddleware();
const logger = createLogger({ collapsed: true });

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk, sagaMiddleware, logger)),
);

const rootSaga = function* () {
  yield all([counterSaga()]);
};

sagaMiddleware.run(rootSaga);

export default store;
export { store };
