import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = "https://animefreak-backend.onrender.com/posts";
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
    try {
      const response = await axios.post(
        `${baseUrl}/create`,
        post,
        tokenConfig(token)
      );
      dispatch(createPost(response.data));
    } catch (e) {
      console.log(e);
      throw new Error(e?.message);
    }
  };
};

export const fetchPosts = (token) => {
  return async (dispatch) => {
    const response = await axios.get(baseUrl, tokenConfig(token));
    dispatch(setPosts(response.data.posts));
  };
};

export const fetchUserPosts = (userId, token) => {
  return async (dispatch) => {
    const response = await axios.get(
      `${baseUrl}/${userId}`,
      tokenConfig(token)
    );
    dispatch(setPosts(response.data));
  };
};

export const likePost = (postId, token) => {
  return async (dispatch) => {
    try {
      const response = await axios.patch(
        `${baseUrl}/${postId}/like`,
        null,
        tokenConfig(token)
      );
      dispatch(updatePosts(response.data));
    } catch (e) {
      throw new Error(e?.message);
    }
  };
};
export const { setPosts, updatePosts, createPost } = postSlice.actions;
export default postSlice.reducer;
