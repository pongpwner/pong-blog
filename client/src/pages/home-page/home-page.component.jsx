import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./home-page.styles.scss";
import Post from "../../components/post/post.component";
//import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";

const HomePage = ({
  currentUser,
  setCurrentUser,
  backendData,
  setBackendData,
}) => {
  //add fetch user in here later
  useEffect(() => {
    async function getPosts() {
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
            //setCurrentUser(data.username);
          }
        });
    }
    async function getCurrentUser() {
      await fetch("/api/user", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.status === "ok") {
            setCurrentUser(data.username);
            //setCurrentUser(data.username);
          }
        });
    }
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt_decode(token);
      //console.log(user);
      if (!user) {
        localStorage.removeItem("token");
      } else {
        //populate posts and get user
        getPosts();
        getCurrentUser();
      }
    }
  }, []);

  //fetch username

  // useEffect(() => {
  //   async function getData() {
  //     await fetch("/api/user", {
  //       headers: {
  //         "x-access-token": localStorage.getItem("token"),
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data);
  //         if (data.status === "ok") {
  //           setCurrentUser(data);
  //           //setCurrentUser(data.username);
  //         }
  //       });
  //   }
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     const user = jwt_decode(token);
  //     console.log(user);
  //     if (!user) {
  //       localStorage.removeItem("token");
  //     } else {
  //      // get user
  //       getData();
  //     }
  //   }
  // }, []);

  return (
    <div className="home-page">
      {currentUser ? <div className="">{currentUser}</div> : null}
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
