import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./home-page.styles.scss";
import Post from "../../components/post/post.component";
//import jwt from "jsonwebtoken";

const HomePage = ({
  currentUser,
  setCurrentUser,
  backendData,
  setBackendData,
}) => {
  useEffect(() => {
    //
    async function getPosts() {
      //console.log("cuurent user:" + currentUser);
      const result = await (
        await fetch("http://localhost:5000/api/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${currentUser.accesstoken}`,
          },
        })
      ).json();
      setBackendData(result);
    }
    //if (currentUser) {
    getPosts();
    //}
  }, []);

  return (
    <div className="home-page">
      <h1>Blog</h1>
      {backendData ? (
        backendData.posts.map((post) => (
          <Post
            title={post.title}
            content={post.content}
            key={post._id}
            id={post._id}
          />
        ))
      ) : (
        <div>login to see posts</div>
      )}
    </div>
  );
};
export default HomePage;
