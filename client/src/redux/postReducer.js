import { createSlice } from "@reduxjs/toolkit";

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
  },
});

export const { setPosts, updatePosts } = postSlice.actions;
export default postSlice.reducer;
