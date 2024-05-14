import React, { useState, useEffect } from "react";
import CommentItem from "../components/CommentItem";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CommentAPI from "../apis/CommentAPI";

const pageSize = 6;

function CommentComponent({ commentAdded, setCommentAdded, recipeId }) {
  const [comments, setComments] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchComments(pageNumber);
  }, [pageNumber, recipeId, commentAdded]);

  const fetchComments = (page) => {
    CommentAPI.getCommentsByRecipeId(recipeId, page, pageSize)
      .then((data) => {
        console.log(JSON.stringify(data));
        setComments(data.comments);
        setTotalPages(data.totalPages);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
  };

  const handlePageChange = (event, value) => {
    setPageNumber(value - 1);
  };

  const handleDeleteSuccess = (commentId) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== commentId)
    );
  };

  const handleUpdateSuccess = (updatedComment) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === updatedComment.id ? updatedComment : comment
      )
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h5">Comments</Typography>
      {comments.length === 0 ? (
        <Typography variant="body1">No comments</Typography>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {comments.map((comment, index) => (
            <CommentItem
              key={index}
              item={comment}
              onDeleteSuccess={handleDeleteSuccess}
              onUpdateSuccess={handleUpdateSuccess}
              setCommentAdded={setCommentAdded}
            />
          ))}
        </div>
      )}
      <Stack direction="row" spacing={2}>
        <Box sx={{ flexGrow: 1 }}>
          <Pagination
            count={totalPages}
            page={pageNumber + 1}
            onChange={handlePageChange}
            shape="rounded"
          />
        </Box>
      </Stack>
    </div>
  );
}

export default CommentComponent;
