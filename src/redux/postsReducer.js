import { getPosts } from "#/api/posts-api.js";

const types = {
  GET_POSTS: "posts/getPosts",
  GET_POSTS_SUCCESS: "posts/getPostsSuccess",
  GET_POSTS_ERROR: "posts/getPostsError",
};

const actionCreators = {
  getPosts: () => ({ type: types.GET_POSTS }),
  getPostsSuccess: (posts) => ({
    type: types.GET_POSTS_SUCCESS,
    payload: posts,
  }),
  getPostError: (error) => ({ type: types.GET_POSTS_ERROR, payload: error }),
};

const initialState = {
  isLoading: false,
  isFetching: false,
  data: null,
  isError: false,
  error: null,
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_POSTS:
      return {
        ...state,
        isLoading: state.data === null,
        isFetching: true,
      };
    case types.GET_POSTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isFetching: false,
        data: action.payload,
        isError: false,
        error: null,
      };
    case types.GET_POSTS_ERROR:
      return {
        ...state,
        isLoading: false,
        isFetching: false,
        isError: true,
        error: action.payload,
      };
    default:
      return state;
  }
};

const thunkActions = {
  getPosts: () => async (dispatch) => {
    dispatch(actionCreators.getPosts());
    try {
      const posts = await getPosts();
      dispatch(actionCreators.getPostsSuccess(posts));
    } catch (e) {
      dispatch(actionCreators.getPostError(e));
    }
  },
};

export default postsReducer;
export { actionCreators, thunkActions, postsReducer };
