import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { thunkActions } from "#/redux/postReducer.js";
import PropTypes from "prop-types";

export default function PostContainer() {
  const navigate = useNavigate();
  const { postId } = useParams();

  const posts = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const { isLoading, isFetching, data, isError, error } = posts[postId];

  useEffect(() => {
    if (postId) dispatch(thunkActions.fetchPost(Number(postId)));
  }, [dispatch, postId]);

  if (isLoading) return <div>loading...</div>;
  if (isError) return <div>{error.message}</div>;
  if (data === null) return <div>no data</div>;

  return (
    <div>
      <button
        onClick={() => {
          dispatch(thunkActions.goPosts(navigate));
        }}
      >
        Go Posts
      </button>
      <Post post={data} />
      <button
        onClick={() => {
          dispatch(thunkActions.fetchPost(postId));
        }}
      >
        Refresh
      </button>
      {isFetching && <div>updating...</div>}
    </div>
  );
}

function Post({ post }) {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};
