import React from "react";
import "./comment-list.styles.scss";
import Comment from "../comment/comment.component";
const CommentList = ({ comments }) => {
  return (
    <div>
      {comments
        ? comments.map((comment) => (
            <Comment username={comment.userName} content={comment.content} />
          ))
        : null}
    </div>
  );
};

export default CommentList;
