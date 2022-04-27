import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./home-page.styles.scss";
import Post from "../../components/post/post.component";
//import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";

const HomePage = () => {
  const [backendData, setBackendData] = useState(null);
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function getData() {
      await fetch("/posts", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.status === "ok") {
            setBackendData(data);
          }
        });
    }
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt_decode(token);
      console.log(user);
      if (!user) {
        localStorage.removeItem("token");
      } else {
        //populate posts
        getData();
      }
    }
  }, []);

  useEffect(() => {
    async function getData() {
      await fetch("/login")
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setUser(data);
        });
    }
    getData();
  }, []);
  return (
    <div className="home-page">
      {user ? <div className="">{user.userName}</div> : null}
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
        <div>loading</div>
      )}
    </div>
  );
};
export default HomePage;
