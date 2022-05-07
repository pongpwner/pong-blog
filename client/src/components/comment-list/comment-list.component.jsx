import React from "react";
import "./comment-list.styles.scss";

const CommentList = ({ comments }) => {
  return (
    <div>
      {comments
        ? comments.map((comment) => (
            <div>{` ${comment.userName}:${comment.content}
       `}</div>
          ))
        : null}
    </div>
  );
};

export default CommentList;
