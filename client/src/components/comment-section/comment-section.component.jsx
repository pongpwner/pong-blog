import React, { useState, useEffect, useContext } from "react";
import "./comment-section.styles.scss";
import CommentList from "../comment-list/comment-list.component";
import CommentInput from "../comment-input/comment-input.component";
import { UserContext } from "../../App";

const CommentSection = ({ id }) => {
  const [accesstoken] = useContext(UserContext);
  const [commentData, setCommentData] = useState({ authenticated: false });
  useEffect(() => {
    async function checkAuth() {
      console.log(accesstoken);
      const result = await (
        await fetch(`http://localhost:5000/api/posts/${id}/comments`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${accesstoken.accesstoken}`,
          },
        })
      ).json();
      setCommentData(result);
    }
    checkAuth();
  }, []);
  return (
    <div className="comment-section">
      {commentData.authenticated ? (
        <div>
          <CommentInput />
          <CommentList />
        </div>
      ) : (
        <div>Log in to access the comments section</div>
      )}
    </div>
  );
};
export default CommentSection;
