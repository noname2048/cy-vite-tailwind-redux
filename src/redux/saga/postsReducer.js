import { call, put, takeEvery } from "redux-saga/effects";
import * as api from "#/api/posts-api.js";

const actionTypes = {
  UPDATE_POSTS_STATUS_FETCH: "saga-posts/UPDATE_POSTS_STATUS_FETCH",
  UPDATE_POSTS_STATUS_SUCCESS: "saga-posts/UPDATE_POSTS_STATUS_SUCCESS",
  UPDATE_POSTS_STATUS_FAILURE: "saga-posts/UPDATE_POSTS_STATUS_FAILURE",
  FETCH_POSTS: "saga-posts/FETCH_POSTS",
};

const actionCreators = {
  updatePostsStatusFetch: () => ({
    type: actionTypes.UPDATE_POSTS_STATUS_FETCH,
  }),
  updatePostsStatusSuccess: (posts) => ({
    type: actionTypes.UPDATE_POSTS_STATUS_SUCCESS,
    payload: posts,
  }),
  updatePostsStatusFailure: (error) => ({
    type: actionTypes.UPDATE_POSTS_STATUS_FAILURE,
    payload: error,
  }),
  fetchPosts: () => ({
    type: actionTypes.FETCH_POSTS,
  }),
};

const sagas = {
  getPosts: function* () {
    try {
      yield put(actionCreators.updatePostsStatusFetch());
      const data = yield call(api.getPosts);
      // const response = api.getPosts(); // 이렇게 하면 동기적으로 작동해버린다
      yield put(actionCreators.updatePostsStatusSuccess(data));
    } catch (e) {
      yield put(actionCreators.updatePostsStatusFailure(e));
    }
  },
};

function* postsSaga() {
  yield takeEvery(actionTypes.FETCH_POSTS, sagas.getPosts);
}

const initialState = {
  isLoading: false,
  isFetching: false,
  data: null,
  isError: false,
  error: null,
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_POSTS_STATUS_FETCH:
      return { ...state, isLoading: state.data === null, isFetching: true };
    case actionTypes.UPDATE_POSTS_STATUS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isFetching: false,
        data: action.payload,
        isError: false,
        error: null,
      };
    case actionTypes.UPDATE_POSTS_STATUS_FAILURE:
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

export { actionTypes, actionCreators, initialState, postsReducer, postsSaga };
