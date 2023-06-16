import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toggleSpinner } from "./spinnerReducer";
import { toast } from "react-toastify";

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
      toast.success("Logged Out successfully");
    },
  },
});

export const loginUser = (email, password) => {
  return async (dispatch) => {
    dispatch(toggleSpinner(true));
    try {
      const response = await axios.post(`/auth/login`, {
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
      console.log(e);
      toast.error("Invalid Credentials");
      throw new Error(e.message);
    } finally {
      dispatch(toggleSpinner(false));
    }
  };
};
export const setFriends = (friendId, token) => {
  return async (dispatch) => {
    try {
      dispatch(toggleSpinner(true));
      const response = await axios.patch(`/user/follow/${friendId}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      window.localStorage.setItem("loggedUser", JSON.stringify(response.data));

      dispatch(updateUser(response.data));
      dispatch(toggleSpinner(false));
      toast.success("Added to friends");
    } catch (e) {
      toast.error("Error adding to friends");
      throw new Error(e.message);
    }
  };
};

export const { setMode, setLogin, setLogout, updateUser } = authSlice.actions;
export default authSlice.reducer;
