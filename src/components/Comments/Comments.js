import { Avatar, Button } from "@mui/material";
import React from "react";
import Comment from "./Comment/Comment";
import { useDispatch, useSelector } from "react-redux";
import { addComment, getCommentsById } from "../../actions/comments";

import "./comments.css";

const Comments = ({ videoId, totalComments }) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getCommentsById(videoId));
  }, [dispatch, videoId]);

  const comments = useSelector((state) => state.comments.comments);

  const _comments = comments?.map(
    (comment) => comment.snippet.topLevelComment.snippet
  );

  const [text, setText] = React.useState("");

  const handleComment = (e) => {
    e.preventDefault();
    if (text.length === 0) return;
    dispatch(addComment(videoId, text));
    setText("");
  };

  return (
    <div className="comments">
      <p>{totalComments} Comments</p>
      <div className="comments_form">
        <Avatar
          className="header_icons"
          alt="Remy Sharp"
          src="/static/images/avatar/1.jpg"
        />
        <form onSubmit={handleComment} className="comments_form_input">
          <input
            className="comments_form_input_area"
            type="text"
            placeholder="write a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button type="submit" variant="contained" color="grey">
            Comment
          </Button>
        </form>
      </div>

      <div className="comments_list">
        {_comments?.map((comment, index) => (
          <Comment key={index} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default Comments;
