import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, fetchUserPosts } from "@/redux/postReducer";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    if (isProfile) {
      dispatch(fetchUserPosts(userId, token));
    } else {
      dispatch(fetchPosts(token));
    }
  }, [dispatch, token, userId, isProfile]);
  const posts = useSelector((state) => state.posts);

  return (
    <>
      {posts.map((post) => (
        <PostWidget key={post._id} post={post} />
      ))}
    </>
  );
};

export default PostsWidget;
