import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import LoginForm from "./LoginForm";
const LoginPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width: 700px)");
  const isTablet = useMediaQuery("(min-width: 800px) and (max-width: 1000px)");
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          AnimeFreak
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          component="img"
          sx={{
            width: "30%",
            padding: "2rem",
            margin: "2rem auto",
            display: { xs: "None", md: "block", lg: "block" },
            maxHeight: "5%",
          }}
          height={"1%"}
          alt="Zoro Image"
          src="https://firebasestorage.googleapis.com/v0/b/salmon-roe.appspot.com/o/assets%2Fpngegg.png?alt=media&token=71d355da-a684-4e91-b3e1-c431e066c983"
        />{" "}
        <Box
          sx={{
            width: { xs: "93%", md: "50%", lg: "29%" },
            height: "18%",
          }}
          p="2rem"
          m="2rem auto"
          borderRadius="1.5rem"
          backgroundColor={theme.palette.background.alt}
        >
          <LoginForm />
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
