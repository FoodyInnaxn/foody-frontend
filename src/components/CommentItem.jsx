import React, { useState, useContext } from "react";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Stack,
  Container,
  Divider,
  Paper,
  Card,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CommentAPI from "../apis/CommentAPI";
import { UserContext } from "../App";

const CommentItem = ({ item, onDeleteSuccess, onUpdateSuccess, setCommentAdded }) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isReplyDialogOpen, setIsReplyDialogOpen] = useState(false);
  const [editedComment, setEditedComment] = useState({
    id: item.id,
    content: item.content,
    postedAt: item.postedAt,
    recipeId: item.recipeId,
    parentId: item?.parentId
  });
  const [replyContent, setReplyContent] = useState("");
  const { user } = useContext(UserContext);

  const handleDeleteComment = () => {
    CommentAPI.deleteComment(user.userId, item.id)
      .then(() => {
        onDeleteSuccess(item.id);
      })
      .catch((error) => {
        console.error("Error deleting comment:", error);
      });
  };

  const handleEditComment = () => {
    CommentAPI.updateComment(user.userId, editedComment)
      .then((updatedComment) => {
        onUpdateSuccess(updatedComment);
        setIsEditDialogOpen(false);
      })
      .catch((error) => {
        console.error("Error updating comment:", error);
      });
  };

  const handleOpenEditDialog = () => {
    setIsEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
  };

  const handleOpenReplyDialog = () => {
    setIsReplyDialogOpen(true);
  };

  const handleCloseReplyDialog = () => {
    setIsReplyDialogOpen(false);
  };

  const handleCreateReply = async () => {
    const currentDate = new Date();
    const newComment = {
      content: replyContent,
      parentId: item.id,
      recipeId: item.recipeId,
      postedAt: currentDate,
    };

    try {
      await CommentAPI.createComment(user.userId, newComment);
      setCommentAdded(true);
      setReplyContent("");
      setIsReplyDialogOpen(false);
    } catch (error) {
      console.error("Error creating reply:", error);
    }
  };

  return (
    <Container>
      {item.parentId ? (
        // Nested comment
        <Paper elevation={3} sx={{ padding: 2, marginBottom: 2, marginLeft: 2 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="body1" sx={{ flexGrow: 1 }}>
              {editedComment.content}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Typography variant="body2" color="textSecondary">
                {new Date(item.postedAt).toLocaleString(undefined, {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })}
              </Typography>
              {user && user.userId === item.userId && (
                <React.Fragment>
                  <IconButton onClick={handleOpenEditDialog}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={handleDeleteComment}>
                    <DeleteIcon />
                  </IconButton>
                </React.Fragment>
              )}
              <IconButton onClick={handleOpenReplyDialog}>Reply</IconButton>
            </Stack>
          </Stack>
        </Paper>
      ) : (
        // Parent comment
        <Card elevation={3} sx={{ marginBottom: 2 }}>
          <Paper elevation={0} sx={{ padding: 2 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="body1" sx={{ flexGrow: 1 }}>
                {editedComment.content}
              </Typography>
              <Stack direction="row" spacing={1}>
                <Typography variant="body2" color="textSecondary">
                  {new Date(item.postedAt).toLocaleString(undefined, {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </Typography>
                {user && user.userId === item.userId && (
                  <React.Fragment>
                    <IconButton onClick={handleOpenEditDialog}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={handleDeleteComment}>
                      <DeleteIcon />
                    </IconButton>
                  </React.Fragment>
                )}
                <IconButton onClick={handleOpenReplyDialog}>Reply</IconButton>
              </Stack>
            </Stack>
          </Paper>
          {/* Render nested comments recursively */}
          {item.nestedComments &&
            item.nestedComments.map((child, index) => (
              <React.Fragment key={child.id}>
                <Divider sx={{ margin: "16px 0" }} />
                <CommentItem
                  item={child}
                  onDeleteSuccess={onDeleteSuccess}
                  onUpdateSuccess={onUpdateSuccess}
                  setCommentAdded={setCommentAdded}
                />
              </React.Fragment>
            ))}
        </Card>
      )}
      <Dialog open={isEditDialogOpen} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Comment</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Comment"
            fullWidth
            value={editedComment.content}
            onChange={(e) =>
              setEditedComment((prevComment) => ({
                ...prevComment,
                content: e.target.value,
              }))
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
          <Button onClick={handleEditComment} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={isReplyDialogOpen} onClose={handleCloseReplyDialog}>
        <DialogTitle>Reply to Comment</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Reply"
            fullWidth
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseReplyDialog}>Cancel</Button>
          <Button onClick={handleCreateReply} color="primary">
            Reply
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CommentItem;
