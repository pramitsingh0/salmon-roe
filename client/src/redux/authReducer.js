import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = "https://animefreak-backend.onrender.com/auth";

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
    updateUser: (state, action) => {
      state.user = action.payload;
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
export const setFriends = (friendId, token) => {
  return async (dispatch) => {
    try {
      const response = await axios.patch(
        `https://animefreak-backend.onrender.com/user/follow/${friendId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(updateUser(response.data));
    } catch (e) {
      throw new Error("Error toggling follow unfollow");
    }
  };
};

export const { setMode, setLogin, setLogout, updateUser } = authSlice.actions;
export default authSlice.reducer;
