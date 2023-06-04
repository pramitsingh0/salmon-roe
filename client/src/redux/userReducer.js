import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = "http://localhost:3001";

const initialState = {
  mode: "light",
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    toggleMode: (state, action) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    unsetUser: (state, action) => {
      state.user = null;
      state.token = null;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${baseUrl}/auth/login`, {
        email,
        password,
      });
      dispatch(setUser(response.data.user));
      dispatch(setToken(response.data.token));
    } catch (e) {
      console.log(e.response.data);
    }
  };
};

export const { toggleMode, setUser, setToken } = authSlice.actions;
export default authSlice.reducer;
