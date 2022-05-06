import React, { useState, useContext } from "react";
import "./comment-input.styles.scss";
import { UserContext } from "../../App";
import e from "express";
const CommentInput = () => {
  const [currentUser] = useContext(UserContext);
  const [comment, setComment] = useState("");

  console.log(currentUser);
  async function onSubmitComment(e) {
    e.preventDefault();
  }
  return (
    <div className="comment-input">
      <form>
        <input
          type="text"
          placeholder="leave a comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default CommentInput;
