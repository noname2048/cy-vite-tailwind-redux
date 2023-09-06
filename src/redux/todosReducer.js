export const ADD_TASK = "task/ADD_TASK";
export const DELETE_TASK = "task/DELETE_TASK";
export const UPDATE_TASK = "task/UPDATE_TASK";
export const CLEAR_TASK = "task/CLEAR_TASK";

export const addTask = (text) => ({
  type: ADD_TASK,
  payload: { id: taskId++, text, isCompleted: false },
});
export const deleteTask = (id) => ({ type: DELETE_TASK, payload: id });
export const updateTask = (task) => ({ type: UPDATE_TASK, payload: task });
export const clearTask = () => ({ type: CLEAR_TASK });

const initialState = {
  tasks: [],
};

let taskId = 1000;

const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        tasks: [...state.tasks, action.payload],
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
