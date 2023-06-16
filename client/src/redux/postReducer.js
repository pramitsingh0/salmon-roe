import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toggleSpinner } from "./spinnerReducer";
import { toast } from "react-toastify";
const tokenConfig = (token) => {
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

const postSlice = createSlice({
  name: "posts",
  initialState: [],
  reducers: {
    setPosts: (state, action) => {
      return action.payload;
    },
    updatePosts: (state, action) => {
      const updatedPosts = state.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
      return updatedPosts;
    },
    createPost: (state, action) => {
      return [action.payload, ...state];
    },
  },
});

export const newPost = (post, token) => {
  return async (dispatch) => {
    dispatch(toggleSpinner(true));
    try {
      const response = await axios.post(
        `/posts/create`,
        post,
        tokenConfig(token)
      );
      dispatch(createPost(response.data));
      toast.success("Post created succefully");
    } catch (e) {
      console.log(e);
      toast.error("Internal Server Error in adding the posts");
      throw new Error(e?.message);
    } finally {
      dispatch(toggleSpinner(false));
    }
  };
};

export const fetchPosts = (token) => {
  return async (dispatch) => {
    try {
      dispatch(toggleSpinner(true));
      const response = await axios.get("/posts", tokenConfig(token));
      dispatch(setPosts(response.data.posts));
      dispatch(toggleSpinner(false));
    } catch (e) {
      toast.error("Error fetching posts from the server. Try Again");
      throw new Error(e?.message);
    }
  };
};

export const fetchUserPosts = (userId, token) => {
  return async (dispatch) => {
    try {
      dispatch(toggleSpinner(true));
      const response = await axios.get(`/posts/${userId}`, tokenConfig(token));
      dispatch(setPosts(response.data));
      dispatch(toggleSpinner(false));
    } catch (e) {
      throw new Error("Error Fetching Posts");
    }
  };
};

export const likePost = (postId, token) => {
  return async (dispatch) => {
    dispatch(toggleSpinner(true));
    try {
      const response = await axios.patch(
        `/posts/${postId}/like`,
        null,
        tokenConfig(token)
      );
      dispatch(updatePosts(response.data));
      toast.success(`Toggeld like on post '${response.data.caption}'`);
    } catch (e) {
      toast.error("Error liking the post");
      throw new Error(e?.message);
    } finally {
      dispatch(toggleSpinner(false));
    }
  };
};

export const commentPost = (postId, commentContent, token) => {
  return async (dispatch) => {
    dispatch(toggleSpinner(true));
    try {
      const resp = await axios.post(
        `/comments/new/${postId}`,
        { comment: commentContent },
        tokenConfig(token)
      );
      dispatch(updatePosts(resp.data));
      toast.success("Comment posted!");
    } catch (e) {
      toast.error("Error creating the comment");
      throw new Error(e?.message);
    } finally {
      dispatch(toggleSpinner(false));
    }
  };
};

export const deletePost = (postId, token) => {
  return async (dispatch) => {
    await axios.delete(`/posts/delete/${postId}`);
    dispatch(fetchPosts(token));
  };
};

export const { setPosts, updatePosts, createPost } = postSlice.actions;
export default postSlice.reducer;
