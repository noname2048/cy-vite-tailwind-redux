import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Counter from "#/components/counter/Counter.jsx";
import Todos from "#/components/todos/Todos.jsx";
import AsyncCounter from "#/components/async-counter/AsyncCounter.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "#/redux/store.js";
import AsyncTodos from "#/components/async-todos/AsyncTodos.jsx";
import Posts from "#/components/posts/Posts.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/counter",
    element: <Counter />,
  },
  {
    path: "/todos",
    element: <Todos />,
  },
  {
    path: "/async-counter",
    element: <AsyncCounter />,
  },
  {
    path: "/async-todos",
    element: <AsyncTodos />,
  },
  {
    path: "/posts",
    element: <Posts />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
