import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import postReducer from "./postReducer";
import spinnerReducer from "./spinnerReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    spinner: spinnerReducer,
  },
});
export default store;
