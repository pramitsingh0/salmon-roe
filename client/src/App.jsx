import { useState } from "react";
import LoginPage from "./components/LoginPage";
import { useSelector } from "react-redux";
import PostsList from "./components/PostsList";

function App() {
  const user = useSelector((state) => state.user);
  return (
    <div>
      {!user.user && <LoginPage />}
      {user.user && <PostsList />}
    </div>
  );
}

export default App;
