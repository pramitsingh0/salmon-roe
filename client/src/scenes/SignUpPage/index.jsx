import { Box, Typography, useTheme, CircularProgress } from "@mui/material";
import SignUpForm from "./SignUpForm";
import { useSelector } from "react-redux";
const SignUpPage = () => {
  const theme = useTheme();
  const spinner = useSelector((state) => state.spinner);
  if (spinner) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
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
          sx={{
            width: { xs: "93%", md: "50%", lg: "29%" },
            height: "18%",
          }}
          p="2rem"
          m="2rem auto"
          borderRadius="1.5rem"
          backgroundColor={theme.palette.background.alt}
        >
          <SignUpForm />
        </Box>
        <Box
          component="img"
          sx={{
            width: { lg: "28%", md: "30%" },
            height: { lg: "55rem", md: "10%" },
            padding: "2rem",
            margin: "2rem auto",
            display: { xs: "None", md: "block", lg: "block" },
            maxHeight: "5%",
          }}
          height={"1%"}
          alt="Luffy Image"
          src="https://firebasestorage.googleapis.com/v0/b/salmon-roe.appspot.com/o/assets%2Fpngegg%20(3).png?alt=media&token=37affe34-c240-4fed-8948-33ddbf92dcf0"
        />{" "}
      </Box>
    </Box>
  );
};

export default SignUpPage;
