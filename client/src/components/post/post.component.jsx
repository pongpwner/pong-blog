import React from "react";
import "./post.styles.scss";

const Post = ({ title, content, id }) => {
  return (
    <div className="post">
      <a href={`/posts/${id}`} className="post-link">
        <h2 className="post-title">{title}</h2>
        <p className="post-content">{content}</p>
      </a>
    </div>
  );
};
export default Post;
