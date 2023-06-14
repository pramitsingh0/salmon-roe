import {
  EditSharp,
  PersonAddOutlined,
  PersonRemoveOutlined,
} from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { setFriends } from "@/redux/authReducer";

const Person = ({ personId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const spinner = useSelector((state) => state.spinner);
  const friends = user.friends;

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend = friends.find((friend) => friend._id === personId);

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${personId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      {spinner ? (
        <Box>
          <CircularProgress />
        </Box>
      ) : (
        <div>
          {user._id != personId ? (
            <IconButton
              onClick={() => dispatch(setFriends(personId, token))}
              sx={{
                backgroundColor: primaryLight,
                p: "0.6rem",
                width: "40px",
                height: "40px",
              }}
            >
              {isFriend ? (
                <PersonRemoveOutlined sx={{ color: primaryDark }} />
              ) : (
                <PersonAddOutlined sx={{ color: primaryDark }} />
              )}
            </IconButton>
          ) : (
            <IconButton
              onClick={() => console.log("Edit post TODO")}
              sx={{
                backgroundColor: primaryLight,
                p: "0.6rem",
                width: "40px",
                height: "40px",
              }}
            >
              <EditSharp sx={{ color: primaryDark }} />
            </IconButton>
          )}
        </div>
      )}
    </FlexBetween>
  );
};

export default Person;
