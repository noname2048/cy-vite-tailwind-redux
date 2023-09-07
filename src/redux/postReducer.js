import { getPostById } from "#/api/posts-api.js";

const FETCH_POST = "post/fetchPost";
const FETCH_POST_SUCCESS = "post/fetchPostSuccess";
const FETCH_POST_ERROR = "post/fetchPostError";

const actionCreators = {
  fetchPost: (id) => ({ type: FETCH_POST, payload: id }),
  fetchPostSuccess: (post) => ({
    type: FETCH_POST_SUCCESS,
    payload: post,
  }),
  fetchPostError: ({ id, error }) => ({
    type: FETCH_POST_ERROR,
    payload: { id, error },
  }),
};

const template = {
  isLoading: false,
  isFetching: false,
  data: null,
  isError: false,
  error: null,
};
const initialState = {
  1: template,
  2: template,
  3: template,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POST:
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          isLoading: state[action.payload].data === null,
          isFetching: true,
        },
      };
    case FETCH_POST_SUCCESS:
      return {
        ...state,
        [action.payload.id]: {
          isLoading: false,
          isFetching: false,
          data: action.payload,
          isError: false,
          error: null,
        },
      };
    case FETCH_POST_ERROR:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload],
          isLoading: false,
          isFetching: false,
          isError: true,
          error: action.payload.error,
        },
      };
    default:
      return state;
  }
};

const thunkActions = {
  fetchPost: (id) => async (dispatch) => {
    dispatch(actionCreators.fetchPost(id));
    try {
      const post = await getPostById(id);
      dispatch(actionCreators.fetchPostSuccess(post));
    } catch (error) {
      dispatch(actionCreators.fetchPostError({ id, error }));
    }
  },
};

export { actionCreators, postReducer, thunkActions };
export default postReducer;
