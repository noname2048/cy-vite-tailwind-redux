import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  deleteTask,
  updateTask,
  clearTask,
} from "#/redux/todosReducer.js";
import PropTypes from "prop-types";
import { useState } from "react";

export default function TodosContainer() {
  const { tasks } = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  return <Todos tasks={tasks} dispatch={dispatch} />;
}

function Todos({ tasks, dispatch }) {
  const [text, setText] = useState("");
  return (
    <div>
      <div>
        <input
          className="border-2 m-2 p-1 rounded-md"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className="border p-1 m-2"
          onClick={() => {
            dispatch(addTask(text));
            setText("");
          }}
        >
          ADD
        </button>
        <button
          className="border p-1 m-2"
          onClick={() => {
            dispatch(clearTask());
            setText("");
          }}
        >
          CLEAR
        </button>
      </div>
      {tasks.map((task) => (
        <Task key={task.id} task={task} dispatch={dispatch} />
      ))}
    </div>
  );
}

Todos.propTypes = {
  tasks: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function Task({ task, dispatch }) {
  const [isEdit, setIsEdit] = useState(false);

  let content;
  if (isEdit) {
    content = (
      <>
        <input
          className="px-1 mx-1 border-2"
          type="text"
          value={task.text}
          onChange={(e) => {
            console.log(e.target.value);
            dispatch(updateTask({ ...task, text: e.target.value }));
          }}
        />
        <button
          className="border p-1"
          onClick={() => {
            setIsEdit(false);
          }}
        >
          Save
        </button>
      </>
    );
  } else {
    content = (
      <>
        <span className="px-1 mx-1">{task.text}</span>
        <button
          className="border p-1 rounded-md mx-1"
          onClick={() => {
            setIsEdit(true);
          }}
        >
          Edit
        </button>
      </>
    );
  }

  return (
    <div className="m-2">
      <input
        className="px-1 mx-1"
        type="checkbox"
        checked={task.isCompleted}
        onChange={(e) => {
          dispatch(updateTask({ ...task, isCompleted: e.target.value }));
        }}
      />
      {content}
      <button
        className="border p-1 rounded-md mx-1"
        onClick={() => {
          dispatch(deleteTask(task.id));
        }}
      >
        Delete
      </button>
    </div>
  );
}

Task.propTypes = {
  task: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};
