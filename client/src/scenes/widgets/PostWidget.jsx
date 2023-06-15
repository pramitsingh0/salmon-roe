import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import {
  Box,
  TextField,
  Divider,
  IconButton,
  Typography,
  useTheme,
  Button,
} from "@mui/material";
import FlexBetween from "@/components/FlexBetween";
import WidgetWrapper from "@/components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { commentPost, likePost } from "@/redux/postReducer";
import Person from "@/components/Person";
import { toggleSpinner } from "@/redux/spinnerReducer";

const PostWidget = ({ post }) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const token = auth.token;
  const user = auth.user;
  const isLiked = post.likes[user._id];
  const likeCount = Object.keys(post.likes).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const red = palette.neutral.red;

  const handleLike = () => {
    dispatch(likePost(post._id, token));
  };
  const handleAddComment = (e) => {
    e.preventDefault();
    console.log(newComment);
    dispatch(commentPost(post._id, newComment, token));
    setNewComment("");
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Person
        personId={post.creator._id}
        name={`${post.creator.firstName} ${post.creator.lastName}`}
        subtitle={post.creator.username}
        userPicturePath={post.creator.profileImageUrl}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {post.caption}
      </Typography>
      {post.imageUrl && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={post.imageUrl}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={handleLike} sx={{ gap: "0.3rem" }}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: red }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
              <Typography>{likeCount}</Typography>
            </IconButton>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton
              onClick={() => setShowComments(!showComments)}
              sx={{ gap: "0.3rem" }}
            >
              <ChatBubbleOutlineOutlined />
              <Typography>{post.comments.length}</Typography>
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {showComments && (
        <Box mt="0.5rem">
          <form onSubmit={handleAddComment} style={{ display: "flex" }}>
            <TextField
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              fullWidth
            />
            <Button
              type="submit"
              disabled={!newComment.trim()}
              variant="contained"
              sx={{ ml: "7px" }}
            >
              Post
            </Button>
          </form>

          {post.comments.map((comment, i) => (
            <Box key={`${comment._id}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment.comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
