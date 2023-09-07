import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { useState } from "react";
import { actions, asyncActions } from "#/redux/asyncTodosReducer.js";

export default function AsyncTodosContainer() {
  const { tasks } = useSelector((state) => state.asyncTodos);
  const dispatch = useDispatch();

  return (
    <div>
      <AsyncTodos tasks={tasks} dispatch={dispatch} />
    </div>
  );
}

function AsyncTodos({ tasks, dispatch }) {
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
            dispatch(asyncActions.addTask(text));
            setText("");
          }}
        >
          ADD
        </button>
        <button
          className="border p-1 m-2"
          onClick={() => {
            dispatch(asyncActions.clearTask());
            setText("");
          }}
        >
          CLEAR
        </button>
      </div>
      {tasks.map((task) => (
        <AsyncTask key={task.id} task={task} dispatch={dispatch} />
      ))}
    </div>
  );
}

AsyncTodos.propTypes = {
  tasks: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function AsyncTask({ task, dispatch }) {
  const [isEdit, setIsEdit] = useState(false);
  const [text, setText] = useState(task.text);

  let content;
  if (isEdit) {
    content = (
      <>
        <input
          className="px-1 mx-1 border-2"
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <button
          className="border p-1"
          onClick={() => {
            setIsEdit(false);
            dispatch(asyncActions.updateTask({ ...task, text }));
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
          dispatch(
            asyncActions.updateTask({ ...task, isCompleted: e.target.value }),
          );
        }}
      />
      {content}
      <button
        className="border p-1 rounded-md mx-1"
        onClick={() => {
          dispatch(asyncActions.deleteTask(task.id));
        }}
      >
        Delete
      </button>
    </div>
  );
}

AsyncTask.propTypes = {
  task: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};
