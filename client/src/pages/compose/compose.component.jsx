import React from "react";
import { Link } from "react-router-dom";
import "./compose.styles.scss";

const Compose = () => {
  return (
    <div className="compose">
      <h1 className="heading-1">Compose</h1>
      <form action="/api/compose" className="post-form" method="post">
        <label className="form-label">Title:</label>
        <input type="text" className="post-title" name="title" />

        <label className="form-label">Body:</label>
        <textarea name="content" id="" cols="60" rows="10"></textarea>

        <button className="submit-button" type="submit">
          Post
        </button>
      </form>
    </div>
  );
};
export default Compose;
