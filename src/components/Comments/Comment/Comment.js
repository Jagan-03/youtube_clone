import { Avatar } from "@mui/material";
import React from "react";

import "./comment.css";
import moment from "moment";

const Comment = ({ comment }) => {
  const { authorDisplayName, authorProfileImageUrl, publishedAt, textDisplay } =
    comment;

  return (
    <div className="comment">
      <Avatar
        className="header_icons"
        alt={authorProfileImageUrl}
        src={authorProfileImageUrl}
      />
      <div className="comment_info">
        <div>{authorDisplayName} . {moment(publishedAt).fromNow()}</div>
        <div>{textDisplay}</div>
      </div>
    </div>
  );
};

export default Comment;
