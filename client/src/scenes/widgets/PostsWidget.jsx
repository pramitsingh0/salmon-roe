import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, fetchUserPosts } from "@/redux/postReducer";
import PostWidget from "./PostWidget";
import { toggleSpinner } from "@/redux/spinnerReducer";
import { CircularProgress, Box } from "@mui/material";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const spinner = useSelector((state) => state.spinner);
  useEffect(() => {
    if (isProfile) {
      dispatch(fetchUserPosts(userId, token));
    } else {
      dispatch(fetchPosts(token));
    }
  }, [dispatch, token, userId, isProfile]);
  const posts = useSelector((state) => state.posts);
  if (spinner) {
    return (
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      {posts.map((post) => (
        <PostWidget key={post._id} post={post} />
      ))}
    </>
  );
};

export default PostsWidget;
