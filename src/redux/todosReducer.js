export const ADD_TASK = "task/ADD_TASK";
export const DELETE_TASK = "task/DELETE_TASK";
export const UPDATE_TASK = "task/UPDATE_TASK";
export const EDIT_TASK = "task/EDIT_TASK";
export const CLEAR_TASK = "task/CLEAR_TASK";

export const addTask = (task) => ({ type: ADD_TASK, payload: task });
export const deleteTask = (id) => ({ type: DELETE_TASK, payload: id });
export const updateTask = (task) => ({ type: UPDATE_TASK, payload: task });
export const editTask = (task) => ({ type: EDIT_TASK, payload: task });
export const clearTask = () => ({ type: CLEAR_TASK });

const initialState = {
  tasks: [],
};

const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.payload.id) {
            return { ...action.payload };
          }
          return task;
        }),
      };
    case EDIT_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.payload.id) {
            return { ...task, title: action.payload.title };
          }
          return task;
        }),
      };
    case CLEAR_TASK:
      return {
        ...state,
        tasks: [],
      };
    default:
      return state;
  }
};

export default todosReducer;
