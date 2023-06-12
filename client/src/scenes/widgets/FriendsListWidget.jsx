import { Box, Typography, useTheme } from "@mui/material";
import Person from "@/components/Person";
import WidgetWrapper from "@/components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "@/redux/authReducer";
import axios from "axios";

const FriendsListWidget = () => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const auth = useSelector((state) => state.auth);
  const token = auth.token;
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    axios
      .get("https://animefreak-backend.onrender.com/user/friends", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setFriends(response.data))
      .catch((e) => {
        throw new Error(e?.message);
      });
  }, [token, friends]);

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
