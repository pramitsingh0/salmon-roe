import Homepage from "@/scenes/HomePage/index";
import LoginPage from "@/scenes/LoginPage";
import ProfilePage from "@/scenes/ProfilePage";
import SignUpPage from "@/scenes/SignUpPage";
import { Navigate, Route, Routes } from "react-router-dom";
import { useTheme, Box } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "@/theme";
import { setLogin } from "@/redux/authReducer";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const theme = useMemo(
    () => createTheme(themeSettings(auth.mode)),
    [auth.mode]
  );
  useEffect(() => {
    if (window.localStorage.getItem("token")) {
      const parsedUser = JSON.parse(window.localStorage.getItem("loggedUser"));
      const parsedToken = JSON.parse(window.localStorage.getItem("token"));
      dispatch(setLogin({ user: parsedUser, token: parsedToken }));
    }
  }, [dispatch]);
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/feed"
            element={auth.user ? <Homepage /> : <Navigate to="/" />}
          />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
