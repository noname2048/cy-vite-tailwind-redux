import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { thunkActions } from "#/redux/postsReducer.js";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function PostsContainer() {
  const { isLoading, data, isFetching, isError, error } = useSelector(
    (state) => state.posts,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkActions.getPosts());
  }, [dispatch]);

  if (isLoading) return <div>loading...</div>;
  if (isError) return <div>{error.message}</div>;
  if (data === null) return <div>no data</div>;

  return (
    <div>
      <Posts posts={data} dispatch={dispatch} />
      <button
        className="m-2 p-2 border rounded-md bg-blue-500 text-white"
        onClick={() => {
          dispatch(thunkActions.getPosts());
        }}
      >
        Refresh
      </button>
      {isFetching && <div className="m-2">updating...</div>}
    </div>
  );
}

function Posts({ posts, dispatch }) {
  return (
    <>
      {posts.map((post) => (
        <Post key={post.id} post={post} dispatch={dispatch} />
      ))}
    </>
  );
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function Post({ post, dispatch }) {
  return (
    <Link to={`/post/${post.id}`}>
      <div className="flex flex-col gap-2 border border-blue-500 rounded-md m-2 p-2">
        <span>{post.id}</span>
        <span>{post.title}</span>
        <span>{post.body}</span>
      </div>
    </Link>
  );
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};
