import React, { useState, useContext } from "react";
import "./comment-input.styles.scss";
import { UserContext } from "../../App";

const CommentInput = ({ id }) => {
  const [currentUser] = useContext(UserContext);
  const [comment, setComment] = useState("");

  console.log(currentUser);
  async function onSubmitComment(e) {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:5000/api/posts/${id}/comment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: currentUser.username,
          postId: id,
          content: comment,
        }),
      }
    );
    const data = await response.json();

    if (data.status === "ok") {
      //do something confirms success
    }
  }
  return (
    <div className="comment-input">
      <form onSubmit={(e) => onSubmitComment(e)}>
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
