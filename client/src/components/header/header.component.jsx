import React, { useState, useEffect } from "react";
import "./header.styles.scss";
import { Link } from "react-router-dom";

const Header = ({ currentUser, setCurrentUser }) => {
  const logOutCallback = async () => {
    await fetch("http://localhost:5000/api/logout", {
      method: "POST",
      credentials: "include", // Needed to include the cookie
    });
    // Clear user from context
    setCurrentUser(null);
  };
  return (
    <div className="header">
      <nav className="navi">
        <ul className="navi-list">
          <li className="navi-list-item">
            <Link to="/">Home</Link>
          </li>
          <li className="navi-list-item">
            <Link to="/compose">Compose</Link>
          </li>
          {currentUser ? (
            <button className="log-out" onClick={logOutCallback}>
              Log Out
            </button>
          ) : null}
          {currentUser ? null : (
            <li className="navi-list-item">
              <Link to="/login">Login</Link>
            </li>
          )}
          {currentUser ? null : (
            <li className="navi-list-item">
              <Link to="/register">Register</Link>
            </li>
          )}

          {currentUser ? <div>{currentUser.username}</div> : null}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
