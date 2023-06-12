import { Box, useMediaQuery } from "@mui/material";
import NavBar from "@/scenes/NavBar";
import UserWidget from "@/scenes/widgets/UserWidget";
import CreatePostWidget from "@/scenes/widgets/CreatePostWidget";
import PostsWidget from "../widgets/PostsWidget";
import { useSelector } from "react-redux";
import FriendsListWidget from "../widgets/FriendsListWidget";

const HomePage = () => {
  const user = useSelector((state) => state.auth.user);
  const isDesktop = useMediaQuery("(min-width:1000px)");
  return (
    <Box>
      <NavBar />
      <Box
        sx={{
          width: "100%",
          padding: "2rem 6%",
          display: { lg: "flex", xs: "block" },
          gap: "0.5rem",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            flexBasis: { xs: undefined, lg: "26%" },
          }}
        >
          <UserWidget userId={user._id} />
        </Box>
        <Box
          sx={{
            flexBasis: { lg: "42%", xs: undefined },
            mt: { lg: undefined, xs: "2rem" },
            width: "100%",
          }}
        >
          <CreatePostWidget profilePath={user.profileImageUrl} />
          <PostsWidget userId={user._id} />
        </Box>
        {isDesktop && (
          <Box flexBasis="26%">
            <Box m="2rem 0" />
            <FriendsListWidget />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
