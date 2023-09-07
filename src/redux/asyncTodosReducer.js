const ADD_TASK = "async-task/ADD_TASK";
const DELETE_TASK = "async-task/DELETE_TASK";
const UPDATE_TASK = "async-task/UPDATE_TASK";
const CLEAR_TASK = "async-task/CLEAR_TASK";

export const actions = {
  addTask: (text) => ({ type: ADD_TASK, payload: text }),
  deleteTask: (id) => ({ type: DELETE_TASK, payload: id }),
  updateTask: (task) => ({ type: UPDATE_TASK, payload: task }),
  clearTask: () => ({ type: CLEAR_TASK }),
};

export const asyncActions = {
  addTask: (text) => (dispatch) => {
    setTimeout(() => {
      dispatch(actions.addTask(text));
    }, 1000);
  },
  deleteTask: (id) => (dispatch) => {
    setTimeout(() => {
      dispatch(actions.deleteTask(id));
    }, 1000);
  },
  updateTask: (task) => (dispatch) => {
    setTimeout(() => {
      dispatch(actions.updateTask(task));
    }, 1000);
  },
  clearTask: () => (dispatch) => {
    setTimeout(() => {
      dispatch(actions.clearTask());
    }, 1000);
  },
};

const initialState = {
  tasks: [],
};

let taskId = 1000;

const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        tasks: [
          ...state.tasks,
          { id: taskId++, text: action.payload, isCompleted: false },
        ],
      };
    case DELETE_TASK:
      return {
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case UPDATE_TASK:
      return {
        tasks: state.tasks.map((task) => {
          if (task.id === action.payload.id) {
            return { ...action.payload };
          }
          return task;
        }),
      };
    case CLEAR_TASK:
      return {
        tasks: [],
      };
    default:
      return state;
  }
};

export default todosReducer;
