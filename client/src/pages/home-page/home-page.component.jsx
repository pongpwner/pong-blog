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
    console.log(currentUser);
    async function getPosts() {
      console.log("cuurent user:" + currentUser);
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

      // await fetch("/api/posts")
      //   .then((res) => res.json())
      //   .then((data) => {
      //     console.log(data);
      //     if (data.status === "ok") {
      //       setBackendData(data);
      //       //setCurrentUser(data.username);
      //     }
      //   });
    }
    if (currentUser) {
      getPosts();
    }
    //getPosts();
    // const token = localStorage.getItem("token");
    // if (token) {
    //   const user = jwt_decode(token);
    //   //console.log(user);
    //   if (!user) {
    //     localStorage.removeItem("token");
    //   } else {
    //     //populate posts and get user
    //     getPosts();

    //   }
    // }
  }, [currentUser]);

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
  //       // get user
  //       getData();
  //     }
  //   }
  // }, []);

  // useEffect(() => {
  //   console.log(currentUser);
  // }, [currentUser]);
  //console.log(backendData);
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
