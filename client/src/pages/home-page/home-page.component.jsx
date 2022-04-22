import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./home-page.styles.scss";
import Post from "../../components/post/post.component";

const HomePage = () => {
  const [backendData, setBackendData] = useState(null);
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function getData() {
      await fetch("/posts")
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setBackendData(data);
        });
    }
    getData();
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
