import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "#/redux/saga/postsReducer.js";
import PropTypes from "prop-types";
import { useEffect } from "react";

export default function SagaPosts() {
  return <PostsContainer />;
}

function PostsContainer() {
  const dispatch = useDispatch();
  const { isLoading, isFetching, data, isError, error } = useSelector(
    (state) => state.sagaPosts,
  );

  useEffect(() => {
    dispatch(actionCreators.fetchPosts());
  }, [dispatch]);

  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>Error</div>;
  if (!data) return <div>No data</div>;

  return (
    <div>
      <Posts data={data} />
      {isFetching && <div>Fetching</div>}
    </div>
  );
}

function Posts({ data }) {
  return data.map((post) => <Post key={post.id} post={post} />);
}

function Post({ post }) {
  return (
    <div className="flex flex-col border m-2 p-2">
      <span className="text-2xl">{post.id}</span>
      <span>{post.title}</span>
      <span>{post.body}</span>
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
};
