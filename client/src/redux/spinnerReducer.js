import { createSlice } from "@reduxjs/toolkit";

const spinnerSlice = createSlice({
  name: "spinner",
  initialState: false,
  reducers: {
    toggleSpinner: (state, action) => {
      return action.payload;
    },
  },
});

export const { toggleSpinner } = spinnerSlice.actions;
export default spinnerSlice.reducer;
