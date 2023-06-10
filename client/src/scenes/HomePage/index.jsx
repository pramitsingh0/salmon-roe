import { Box } from "@mui/material";
import NavBar from "@/scenes/NavBar";
import UserWidget from "@/scenes/widgets/UserWidget";
import { useSelector } from "react-redux";

const HomePage = () => {
  const user = useSelector((state) => state.auth.user);
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
      </Box>
    </Box>
  );
};

export default HomePage;
