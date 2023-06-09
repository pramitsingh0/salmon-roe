import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = "http://localhost:3001/auth";

const initialState = {
  mode: "light",
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      (state.user = null), (state.token = null);
      window.localStorage.clear();
    },
  },
});

export const loginUser = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${baseUrl}/login`, {
        email,
        password,
      });
      dispatch(
        setLogin({ user: response.data.user, token: response.data.token })
      );
      window.localStorage.setItem(
        "loggedUser",
        JSON.stringify(response.data.user)
      );
      window.localStorage.setItem("token", JSON.stringify(response.data.token));
    } catch (e) {
      throw new Error(e.message);
    }
  };
};

export const { setMode, setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;
