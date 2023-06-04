import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = "http://localhost:3001/posts";
const initialState = [];
const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      return action.payload;
    },
  },
});

export const fetchPosts = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${baseUrl}/`);
      dispatch(setPosts(response.data.posts));
    } catch (e) {
      console.log(e.response.data);
    }
  };
};

export const { setPosts } = postSlice.actions;
export default postSlice.reducer;
