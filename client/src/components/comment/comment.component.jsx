import React from "react";
import "./comment.styles.scss";

const Comment = ({ username, content }) => {
  return (
    <div className="comment">
      <div className="username">{username}</div>
      <div className="content">{content}</div>
    </div>
  );
};

export default Comment;
