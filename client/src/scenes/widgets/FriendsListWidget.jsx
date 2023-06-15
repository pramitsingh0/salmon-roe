import { Box, CircularProgress, Typography, useTheme } from "@mui/material";
import Person from "@/components/Person";
import WidgetWrapper from "@/components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toggleSpinner } from "@/redux/spinnerReducer";

const FriendsListWidget = () => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const auth = useSelector((state) => state.auth);
  const token = auth.token;
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    dispatch(toggleSpinner(true));
    axios
      .get("/user/friends", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setFriends(response.data);
      })
      .catch((e) => {
        console.log("errror fetching friend lsit");
        throw new Error(e?.message);
      });
    dispatch(toggleSpinner(false));
  }, [token]);

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight={"500"}
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        {friends.length ? (
          friends.map((person) => (
            <Person
              key={person._id}
              personId={person._id}
              name={`${person.firstName} ${person.lastName}`}
              subtitle={person.username}
              userPicturePath={person.profileImageUrl}
            />
          ))
        ) : (
          <Typography>
            No friends yet. Explore more to add new friends
          </Typography>
        )}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendsListWidget;
