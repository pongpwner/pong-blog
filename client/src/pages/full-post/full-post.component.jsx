import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import CommentSection from "../../components/comment-section/comment-section.component";
const FullPost = () => {
  const { id } = useParams();
  const [currentPost, setCurrentPost] = useState(null);

  useEffect(() => {
    async function getData() {
      console.log(id);
      await fetch(`http://localhost:5000/api/posts/${id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setCurrentPost(data);
        });
    }
    getData();
  }, []);
  return (
    <div className="full-post">
      {currentPost ? (
        <div className="container">
          <div className="post">
            <h1 className="title">{currentPost[0].title}</h1>
            <div className="content">{currentPost[0].content}</div>
          </div>
          <CommentSection id={id} />
        </div>
      ) : (
        <div className="loading">loading</div>
      )}
    </div>
  );
};

export default FullPost;
